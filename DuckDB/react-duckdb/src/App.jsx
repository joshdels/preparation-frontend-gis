import React, { useEffect, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";

// ✅ Import WASM and Worker files as URLs for Vite
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

function DuckDBExample() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function initDuckDB() {
      // ✅ Create manual bundles for Vite
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

      // Pick the best bundle based on browser support
      const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

      // Start a new DuckDB worker
      const worker = new Worker(bundle.mainWorker);
      const logger = new duckdb.ConsoleLogger();
      const db = new duckdb.AsyncDuckDB(logger, worker);

      // Instantiate the database
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      // Connect to DuckDB
      const conn = await db.connect();

      // Example query
      await conn.query("CREATE TABLE people(name VARCHAR, age INTEGER)");
      await conn.query("INSERT INTO people VALUES ('Alice', 30), ('Bob', 25)");
      const res = await conn.query("SELECT * FROM people WHERE age > 24");

      setResult(res.toArray());
    }

    initDuckDB();
  }, []);

  return (
    <div>
      <h2>DuckDB + React + Vite</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default DuckDBExample;
