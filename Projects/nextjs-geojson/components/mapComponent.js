"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapToggler } from "../hooks/useMapToggler";

export default function MapComponent() {
  const { action } = useMapToggler();
  const mapContainer = useRef(null);
  const map = useRef(null);

  // 🗺️ Initialize map once
  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
        center: [121, 14],
        zoom: 6,
      });

      map.current.on("load", () => {
        // Add the source ONCE
        if (!map.current.getSource("school-source")) {
          map.current.addSource("school-source", {
            type: "geojson",
            data: "data/schools.geojson",
          });
        }
      });
    }
  }, []);

  // 🎛️ Respond to action changes
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    if (action === "addLayer") {
      if (!map.current.getLayer("school-layer")) {
        map.current.addLayer({
          id: "school-layer",
          type: "circle",
          source: "school-source",
          paint: {
            "circle-color": "red",
            "circle-opacity": 0.6,
          },
        });
      }
    } else if (action === "removeLayer") {
      if (map.current.getLayer("school-layer")) {
        map.current.removeLayer("school-layer");
      }
    }
  }, [action]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "80vh",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />
  );
}
