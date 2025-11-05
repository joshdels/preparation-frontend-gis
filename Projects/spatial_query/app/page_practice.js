"use client"

import { useEffect } from "react";
import useDuckDBStore from "@/store/useDuckDB";
import Map from "@/layout/Map";

export default function Home() {
  const {result, parquet, readParquet, initDuckDB, } = useDuckDBStore();

  useEffect(() => {
    (async () => {
      await initDuckDB();
      await readParquet();
    })();
  }, []);

  return (
    <>
      
      <Map />
      <ul>
        {result.map((r, i) => (
          <li key={i}>
            {r.name} — {r.age}
          </li>
        ))}
        {parquet.map((r, i) => (
          <li key={i}>
            {r.name} — {r.pop_est}
          </li>
        ))}
      </ul>
    </>
  );
}
