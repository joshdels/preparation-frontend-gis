"use client";

import * as duckdb from "@duckdb/duckdb-wasm";
import { create } from "zustand";

const useDuckDBStore = create((set, get) => ({
  db: null,
  conn: null,
  geojson: null,
  population: null,
  inputValue: "",

  // Update input value in store
  setInputValue: (value) => set({ inputValue: value }),

  // Update population
  setPopulation: (p) => set({ population: p }),

  setConn: (c) => set({ conn: c }),

  // Form submit handler
  handleSubmit: async (e) => {
    e.preventDefault();
    const { inputValue, setPopulation, filterData } = get();
    setPopulation(Number(inputValue));
    await filterData();
  },

  // Initialize DuckDB
  initDuckDB: async () => {
    if (typeof window === "undefined") return;
    const { conn } = get();
    if (conn) return;

    try {
      const bundles = duckdb.getJsDelivrBundles();
      const bundle = await duckdb.selectBundle(bundles);

      const workerSource = await fetch(bundle.mainWorker).then((r) => r.text());
      const blob = new Blob([workerSource], { type: "text/javascript" });
      const worker = new Worker(URL.createObjectURL(blob));

      const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      const conn = await db.connect();
      set({ db, conn });

      await conn.query("INSTALL spatial; LOAD spatial;");
      console.log("✅ DuckDB initialized");
    } catch (err) {
      console.error("DuckDB init failed:", err);
    }
  },

  // Read GeoParquet
  readParquet: async () => {
    const { db, conn } = get();
    if (!db || !conn) return;

    try {
      const response = await fetch("/example.parquet");
      if (!response.ok) throw new Error("Parquet file not found in /public");

      const buffer = await response.arrayBuffer();
      await db.registerFileBuffer("example.parquet", new Uint8Array(buffer));

      await conn.query(`
        CREATE TABLE my_geoparquet AS
        SELECT * FROM read_parquet('example.parquet');
      `);

      const res = await conn.query(`
        SELECT json_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry),
          'properties', json_object(
            'pop_est', pop_est,
            'continent', continent,
            'name', name,
            'gdp_md_est', gdp_md_est
          )
        ) AS feature_json
        FROM my_geoparquet;
      `);

      const features = res.toArray().map((r) => JSON.parse(r.feature_json));

      set({ geojson: { type: "FeatureCollection", features } });
      console.log("✅ GeoJSON ready");
    } catch (err) {
      console.error("File Error:", err);
    }
  },

  // Filter data by population
  filterData: async () => {
    const { conn, population } = get();
    if (!conn) return;

    try {
      const res = await conn.query(`
        SELECT json_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry),
          'properties', json_object(
            'pop_est', pop_est,
            'continent', continent,
            'name', name,
            'gdp_md_est', gdp_md_est
          )
        ) AS feature_json
        FROM my_geoparquet
        WHERE pop_est < ${population};
      `);

      const features = res.toArray().map((r) => JSON.parse(r.feature_json));
      set({ geojson: { type: "FeatureCollection", features } });
      console.log("Filtered GeoJSON ready");
    } catch (err) {
      console.error("Filter error:", err);
    }
  },
}));

export default useDuckDBStore;
