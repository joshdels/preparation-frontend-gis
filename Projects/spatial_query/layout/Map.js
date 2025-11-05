"use client"

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0,0],
      zoom: 3,
    })
  })

  return ( 
  <>
    <div ref={mapContainer} style={{ width: "100%", height: "100vh"}}></div>
  </> 
  );
}
 
export default Map;