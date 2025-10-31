import * as duckdb from 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm/+esm';

// -----------------------------
// 🧠 Instantiation
// -----------------------------

const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

const worker_url = URL.createObjectURL(
  new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
);

const worker = new Worker(worker_url);
const logger = new duckdb.ConsoleLogger();
const db = new duckdb.AsyncDuckDB(logger, worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

const conn = await db.connect();
const result = await conn.query(`SELECT 42 AS answer`);
console.log(result.toArray());

// -----------------------------
// 🧠 Apache Arrow section
// -----------------------------
import { tableFromArrays } from 'https://cdn.jsdelivr.net/npm/apache-arrow/+esm';

// EOS = End Of Stream marker for Arrow streaming
const EOS = new Uint8Array([255, 255, 255, 255, 0, 0, 0, 0]);

// Create an Arrow table from arrays
const arrowTable = tableFromArrays({
  id: [1, 2, 3],
  name: ['John', 'Jane', 'Jack'],
  age: [20, 21, 22],
});

await conn.query(`
  CREATE TABLE arrow_table(
    id INTEGER,
    name VARCHAR,
    age INTEGER
  )
`);

// ✅ Insert Arrow data into DuckDB
await conn.insertArrowTable(arrowTable, { name: 'arrow_table' });

// Signal end of Arrow stream
await conn.insertArrowTable(EOS, { name: 'arrow_table' });

// Query back what we inserted
const res = await conn.query(`SELECT * FROM arrow_table`);
console.log(res.toArray());

// -----------------------------
// 🧠 CSV Example
// -----------------------------

const csvContent = '1|foo\n2|bar\n';
await db.registerFileText('data.csv', csvContent);

// 2️⃣ Create a table from the CSV file
await conn.query(`
  CREATE TABLE foo AS 
  SELECT * FROM read_csv_auto('data.csv', 
    delim='|', 
    header=false, 
    columns={'col1': 'INTEGER', 'col2': 'VARCHAR'}
  );
`);

// 3️⃣ Query the data
const res1 = await conn.query('SELECT * FROM foo');
console.log(res1.toArray());

// -----------------------------
// 🧠 CSV Example
// -----------------------------
const jsonRowContent = [
  { "col1": 1, "col2": "foo" },
  { "col1": 2, "col2": "bar" },
]

await db.registerFileText('rows.json', JSON.stringify(jsonRowContent));

const resJSON = await conn.query(`SELECT * FROM read_json_auto('rows.json')`);
console.table(resJSON.toArray());

// -----------------------------
// 🧠 Parquet Example
// -----------------------------
await db.registerFileURL(
  'remote.parquet',
  'https://example.com/data.parquet',
  duckdb.DuckDBDataProtocol.HTTP,
  false
);

const resParquet = await conn.query(`SELECT * FROM 'remote.parquet'`);
console.table(resParquet.toArray());

