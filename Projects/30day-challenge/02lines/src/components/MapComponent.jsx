import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapComponent({ setZoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
      center: [0, 0],
      zoom: 3,
    });

    map.current.on("load", async () => {
      const geojsonUrl = "road3.geojson";

      // Load your GeoJSON
      const response = await fetch(geojsonUrl);
      const geojson = await response.json();

      // Add line source + layer
      map.current.addSource("roads", { type: "geojson", data: geojson });

      map.current.addLayer({
        id: "roads-primary",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "fclass"], "primary"],
        paint: { "line-color": "#300570", "line-width": 5 },
        minzoom: 5,
      });

      map.current.addLayer({
        id: "roads-secondary",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "fclass"], "secondary"],
        paint: { "line-color": "#5609C8", "line-width": 3 },
        minzoom: 10,
      });

      map.current.addLayer({
        id: "roads-other",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "fclass"], "tertiary"],
        paint: { "line-color": "#BA8FFA", "line-width": 2 },
        minzoom: 12,
      });

      //Zooom
      map.current.on('zoom', () => {
        setZoom((map.current.getZoom()).toFixed(2));
      });

      // Compute bounds (since all are lines)
      const bounds = new maplibregl.LngLatBounds();
      geojson.features.forEach((e) => {
        e.geometry.coordinates.forEach(([lng, lat]) => bounds.extend([lng, lat]));
      });

      // Zoom and center on all lines
      map.current.fitBounds(bounds, { padding: 40,});
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "97vh", border: "1px solid #ccc" }}
    />
  );
}
