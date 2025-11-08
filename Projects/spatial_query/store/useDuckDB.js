"use client";

import * as duckdb from "@duckdb/duckdb-wasm";
import { create } from "zustand";

const useDuckDBStore = create((set) => ({
  db: null,
  conn: null,
  parquet: null,

  setConn: (c) => set({ conn: c }),

  // ✅ Initialize DuckDB
  initDuckDB: async () => {
    if (typeof window === "undefined") return;
    const { conn } = useDuckDBStore.getState();
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

  // ✅ Read GeoParquet and convert to GeoJSON
  readParquet: async () => {
    const { db, conn } = useDuckDBStore.getState();
    if (!db || !conn) {
      console.warn("DuckDB not initialized yet");
      return;
    }

    try {
      const response = await fetch("/example.parquet");
      if (!response.ok) throw new Error("Parquet file not found in /public");

      const buffer = await response.arrayBuffer();
      await db.registerFileBuffer("example.parquet", new Uint8Array(buffer));

      // Create temporary table
      await conn.query(`
        CREATE TABLE my_geoparquet AS
        SELECT * FROM read_parquet('example.parquet');
      `);

      // Convert to GeoJSON (assuming column 'geometry' exists)
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

      const geoJsonOutput = {
        type: "FeatureCollection",
        features: features,
      };

      console.log("✅ GeoJSON ready:", geoJsonOutput);
      set({ parquet: geoJsonOutput });
    } catch (err) {
      console.error("File Error:", err);
    }
  },

  // filterData
}));

export default useDuckDBStore;
