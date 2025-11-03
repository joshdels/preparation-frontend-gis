import React, { useEffect, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";

// ✅ Import WASM and Worker files as URLs for Vite
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

function DuckDBExample() {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [conn, setConn] = useState(null);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setQueryDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!conn) return;

    await conn.query(`INSERT INTO people VALUES ('${name}', ${age});`);
    const result = await conn.query(`SELECT * FROM people`);
    setResult(result.toArray().map(r => r.toJSON()));
  }

  const handleFilter = async (e) => {
    e.preventDefault();
    if (!conn) return;

    const result = await conn.query(`SELECT * FROM people WHERE age ${filter}`)
    setResult(result.toArray().map(r => r.toJSON()));
  }


  useEffect(() => {
    async function initDuckDB() {
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

      // Instantiate the database //// FInal installation
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      // -> START!  
      // Connect to DuckDB
      const conn = await db.connect();
      setConn(conn);

      // Example query
      await conn.query("CREATE TABLE people(name VARCHAR, age INTEGER)");
      await conn.query("INSERT INTO people VALUES ('Alice', 30), ('Bob', 25), ('Josh', 26)");
      const res = await conn.query("SELECT * FROM people");

      setResult(res.toArray().map(r=> r.toJSON()));
    }

    initDuckDB();
  }, []);

  return (
    <div>
      <h2>DuckDB + React + Vite</h2>
      <div>
        <h1>Add Data</h1>
        <form onSubmit={handleSubmit}>
        <label>Add Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <label>Age</label>
        <input 
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}  
        />
        <button type="submit">Submit</button>
      </form>
      </div>
      <div>
        <form onSubmit={handleFilter}>
          <label>Filter</label>
          <input 
            type="text" 
            value={filter}
            onChange={(e => setFilter(e.target.value))}
          />
          <button type="submit">Filter</button>
        </form>
      </div>
      <pre>{JSON.stringify(result, null, 3)}</pre>
    </div>
  );
}

export default DuckDBExample;
