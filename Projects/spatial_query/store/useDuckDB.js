"use client";

import * as duckdb from "@duckdb/duckdb-wasm";
import { create } from "zustand";

const useDuckDBStore = create((set) => ({
  db: null,
  conn: null,
  parquet: [],
  result: [],

  setResult: (r) => set({ result: r }),
  setConn: (c) => set({ conn: c }),

  initDuckDB: async () => {
    if (typeof window === "undefined") return;
    const { conn } = useDuckDBStore.getState();
    if (conn) return;

    try {
      // ✅ Auto-detect bundle
      const bundles = duckdb.getJsDelivrBundles();
      const bundle = await duckdb.selectBundle(bundles);

      // ✅ Fetch worker script and create Blob worker (bypasses CORS)
      const workerSource = await fetch(bundle.mainWorker).then((r) => r.text());
      const blob = new Blob([workerSource], { type: "text/javascript" });
      const worker = new Worker(URL.createObjectURL(blob));

      const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      const conn = await db.connect();
      set({ db, conn });

      await conn.query("CREATE TABLE people(name VARCHAR, age INTEGER)");
      await conn.query(
        "INSERT INTO people VALUES ('Alice', 30), ('Bob', 25), ('Josh', 26)"
      );

      const res = await conn.query("SELECT * FROM people");
      set({ result: res.toArray().map((r) => r.toJSON()) });
    } catch (err) {
      console.error("DuckDB init failed:", err);
    }
  },

  readParquet: async () => {
    const { db, conn } = useDuckDBStore.getState();
    if (!db || !conn) {
      console.warn("DuckDB not initialized yet");
      return;
    }

    try {
      // I dont know this?
      const response = await fetch("/example.parquet");
      if (!response.ok) throw new Error("Parquet file not found in /public");
      const buffer = await response.arrayBuffer();
      await db.registerFileBuffer("example.parquet", new Uint8Array(buffer));
      
      const res = await conn.query("SELECT * FROM read_parquet('example.parquet')");
      const data = res.toArray().map((r) => r.toJSON());
      set({ parquet: data });
    } catch (err) {
      console.error("File Error:", err);
    }
  },

}));

export default useDuckDBStore;
