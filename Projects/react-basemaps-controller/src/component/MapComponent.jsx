import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapComponent({ basemap, setCoords }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
 

  useEffect(() => {
    // create map only once
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: basemap,
        center: [121, 14],
        zoom: 6,
      });

      map.current.on("mousemove", (e) => {
        setCoords({
          lng: e.lngLat.lng.toFixed(5),
          lat: e.lngLat.lat.toFixed(5),
        })
      })

    } else {
      // ✅ just update the style instead of recreating the map
      map.current.setStyle(basemap);
    }
  }, [basemap]); // re-run when basemap changes

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "80vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    />
  );
}
