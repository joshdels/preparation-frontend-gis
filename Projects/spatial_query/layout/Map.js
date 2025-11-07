"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = ({ data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initialize once
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 3,
    });

    return () => map.current?.remove();
  }, []);

  // Update source when data changes
  useEffect(() => {
    if (!map.current || !data) return;
    const mapObj = map.current;

    if (mapObj.isStyleLoaded()) {
      if (mapObj.getSource("states-data")) {
        mapObj.getSource("states-data").setData(data);
      } else {
        mapObj.addSource("states-data", {
          type: "geojson",
          data: data,
        });

        mapObj.addLayer({
          id: "states-layer",
          type: "fill",
          source: "states-data",
          paint: {
            "fill-color": "red",
            "fill-outline-color": "black",
          },
        });
      }
    }
  }, [data]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Map;
