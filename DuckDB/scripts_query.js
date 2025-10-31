import * as duckdb from 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm/+esm';

// -----------------------------
// 🧠 Instantiation
// -----------------------------

// 1️⃣ Load the correct WASM bundle
const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

// 2️⃣ Create the worker from the bundle
const worker_url = URL.createObjectURL(
  new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
);
const worker = new Worker(worker_url);

// 3️⃣ Initialize database
const logger = new duckdb.ConsoleLogger();
const db = new duckdb.AsyncDuckDB(logger, worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

// 4️⃣ Connect and query
const conn = await db.connect();
const result = await conn.query(`SELECT * FROM generate_series(1, 10) AS t(v)`);

// 5️⃣ Convert Arrow to JSON
const rows = result.toArray().map(row => row.toJSON());
console.log('Query Result:', rows);

// -----------------------------
// 📦 Export to Parquet
// -----------------------------

// ✅ FIXED: typo `TALBE` → `TABLE`
await conn.query(`CREATE TABLE tbl AS SELECT * FROM generate_series(1, 10) t(v);`);

// Run the export query
await conn.send(`COPY (SELECT * FROM tbl) TO 'result.parquet' (FORMAT parquet);`);

// Copy the Parquet file to memory buffer
const parquetBuffer = await db.copyFileToBuffer('result.parquet');

// ✅ FIXED: Blob creation & link logic
const parquetBlob = new Blob([parquetBuffer], { type: 'application/octet-stream' });
const parquetUrl = URL.createObjectURL(parquetBlob);

// ✅ FIXED: create actual <a> element for download
const parquetLink = document.createElement('a');
parquetLink.href = parquetUrl;
parquetLink.download = 'result.parquet';
parquetLink.textContent = 'Download Parquet File';
document.body.appendChild(parquetLink);

// Cleanup
await conn.close();
await db.terminate();
