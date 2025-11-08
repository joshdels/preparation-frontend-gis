"use client"

import { useEffect } from "react";
import useDuckDBStore from "@/store/useDuckDB";
import Map from "@/layout/Map";

export default function Home() {
  const {parquet, readParquet, initDuckDB, } = useDuckDBStore();

  useEffect(() => {
    (async () => {
      await initDuckDB();
      await readParquet();
    })();
  }, []);

  return (
    <>
      <Map data={parquet}/>
    </>
  );
}
