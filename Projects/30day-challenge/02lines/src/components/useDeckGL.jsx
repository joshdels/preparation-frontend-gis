import React, { useEffect, useRef } from "react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";

export function UseDeckGL() {
  const mapContainer = useRef(null);

  useEffect(() => {
    // ✅ Initialize MapLibre
    const map = new Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [0.45, 51.47],
      zoom: 11,
    });

    map.on("load", () => {
      const overlay = new MapboxOverlay({
        interleaved: true,
        layers: [
          new ScatterplotLayer({
            id: "deck-scatter",
            data: [{ position: [0.45, 51.47] }],
            getPosition: (d) => d.position,
            getFillColor: [255, 0, 0, 180],
            getRadius: 1000,
          }),
        ],
      });

      map.addControl(overlay);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}

export function Deck3DBuildings() {
  const mapContainer2 = useRef(null);

  useEffect(() => {
    const map = new Map({
      container: mapContainer2.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [55.2744, 25.1972],
      zoom: 15.5,
      pitch: 60,
      bearing: -20,
      canvasContextAttributes: { antialias: true },
    });

    map.on("load", () => {
      map.addSource("openfreemap", {
        url: "https://tiles.openfreemap.org/planet",
        type: "vector",
      });

      const labelLayerId = map.getStyle().layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      )?.id;
  
      map.addLayer(
        {
          id: "3d-buildings",
          source: "openfreemap",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          // filter: ["!=", ["get", "hide_3d"], true],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              0,
              "lightgray",
              200,
              "royalblue",
              400,
              "purple",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13,
              0,
              16,
              ["get", "render_height"],
            ],
            "fill-extrusion-base": [
              "case",
              [">=", ["get", "zoom"], 16],
              ["get", "render_min_height"],
              0,
            ],
          },
        },
        labelLayerId
      );
    });
    return () => map.remove();

  }, []);

  return (
    <div ref={mapContainer2} style={{ width: "100vw", height: "100vh" }} />
  );
}
