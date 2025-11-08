"use client";

import { useEffect } from "react";
import useDuckDBStore from "@/store/useDuckDB";
import Map from "@/layout/Map";

export default function Home() {
  const geojson = useDuckDBStore((state) => state.geojson);
  const inputValue = useDuckDBStore((state) => state.inputValue);
  const setInputValue = useDuckDBStore((state) => state.setInputValue);
  const handleSubmit = useDuckDBStore((state) => state.handleSubmit);
  const { initDuckDB, readParquet } = useDuckDBStore();

  useEffect(() => {
    const loadData = async () => {
      await initDuckDB();
      await readParquet();
    };
    loadData();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Map data={geojson} />

      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 500,
          background: "black",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px white",
        }}
      >
        <label>Population: </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "5px" }}>
          Filter
        </button>
      </form>
    </div>
  );
}
