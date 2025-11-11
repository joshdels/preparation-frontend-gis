import React, { useEffect, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import { HexagonLayer, ScatterplotLayer } from "@deck.gl/aggregation-layers";
import maplibregl from "maplibre-gl";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function loadData() {
  const [data, setData] = useState([]);
  const [elevationScale, setElevationScale] = useState(0);

  useEffect(() => {
    // Generate random clustered data
    const generated = Array.from({ length: 1000 }, () => ({
      longitude: -122.4 + (Math.random() - 0.5) * 0.2,
      latitude: 37.8 + (Math.random() - 0.5) * 0.2,
      count: Math.floor(Math.random() * 10) + 1
    }));
    setData(generated);

    // Important: trigger elevation animation *after render*
    const timeout = setTimeout(() => setElevationScale(50), 500);

    return () => clearTimeout(timeout);
  }, []);

  const INITIAL_VIEW_STATE = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
    pitch: 45,
    bearing: 0
  };

  const layers = [
    new ScatterplotLayer({
      id: "hex-layer",
      data,
      getPosition: (d) => [d.longitude, d.latitude],
      getElevationWeight: (d) => d.count,
      elevationScale,
      extruded: true,
      radius: 100,
      pickable: true,
      coverage: 1,
      transitions: {
        elevationScale: 10 // milliseconds (2s)
      }
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        mapLib={maplibregl}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      />
    </DeckGL>
  );
}
