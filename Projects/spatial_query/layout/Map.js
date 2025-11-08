"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = ({ data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initialize Map once
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [0, 0],
      zoom: 2,
    });

    return () => map.current?.remove();
  }, []);

  // Update GeoJSON & bounds whenever `data` changes
  useEffect(() => {
    if (!map.current || !data) return;
    const mapObj = map.current;

    // Add or update source
    if (mapObj.getSource("geo-data")) {
      mapObj.getSource("geo-data").setData(data);
    } else {
      mapObj.addSource("geo-data", { type: "geojson", data });

      mapObj.addLayer({
        id: "geo-layer",
        type: "fill",
        source: "geo-data",
        paint: {
          "fill-color": "#ff0000",
          "fill-outline-color": "#000000",
          "fill-opacity": 0.6,
        },
      });
    }

    // Always update bounds
    const bounds = new maplibregl.LngLatBounds();
    data.features.forEach((feature) => {
      const coords = feature.geometry.coordinates.flat(Infinity);
      for (let i = 0; i < coords.length; i += 2) {
        bounds.extend([coords[i], coords[i + 1]]);
      }
    });
    if (!bounds.isEmpty()) {
      mapObj.fitBounds(bounds, { padding: 30, maxZoom: 10 });
    }
  }, [data]); // Only depend on `data`

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Map;
