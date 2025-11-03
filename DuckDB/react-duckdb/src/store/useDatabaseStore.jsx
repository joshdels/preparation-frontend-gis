import * as duckdb from "@duckdb/duckdb-wasm";
import { create } from "zustand";

import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

const MANUAL_BUNDLES = {
      mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
      },
      eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
      },
    };

const useDatabaseStore = create((set) => ({
  result: [],
  name: "",
  age: "",
  conn: null,
  filter: "",

  setResult: (r) => set({ result: r }),
  setName: (n) => set({ name: n }),
  setAge: (a) => set({ age: a }),
  setConn: (c) => set({ conn: c }),
  setFilter: (f) => set({ filter: f }),

  initDuckDB: async () => {
    const { conn } = useDatabaseStore.getState();
    if (conn) return;

    try {
      const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
      const worker = new Worker(bundle.mainWorker);
      const logger = new duckdb.ConsoleLogger();
      const db = new duckdb.AsyncDuckDB(logger, worker);
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      const conn = await db.connect();
      set({ conn });

      await conn.query("CREATE TABLE people(name VARCHAR, age INTEGER)");
      await conn.query(
        "INSERT INTO people VALUES ('Alice', 30), ('Bob', 25), ('Josh', 26)"
      );
      const res = await conn.query("SELECT * FROM people");
      set({ result: res.toArray().map((r) => r.toJSON() )});
    } catch (err) {
      console.error("duckDB init failed", err)
    };
  },

  insertPerson: async (name, age) => {
    const { conn } = useDatabaseStore.getState();
    if (!conn) return;

    await conn.query(`INSERT INTO people VALUES ('${name}', ${age})`);
    const result = await conn.query("SELECT * FROM people");
    set({ result: result.toArray().map((r) => r.toJSON())})
  },

  filterPeople: async () => {
    const { conn, filter } = useDatabaseStore.getState();
    if (!conn) return;

    const result = await conn.query(`SELECT * FROM people WHERE age ${filter}`)
    set({result: result.toArray().map(r => r.toJSON())});
  }

}));

export default useDatabaseStore;
