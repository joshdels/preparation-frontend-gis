import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { Map } from "maplibre-gl";

// MAP
const map = new Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/bright",
  center: [-77.04, 38.907],
  zoom: 3,
});

// INTERACTIVE CONTROLS
map.addControl(
  new maplibregl.NavigationControl({
    showCompass: true,
    showZoom: true,
    visualizePitch: false,
    visualizeRoll: false,
  }),
  "top-left"
);

// map.addControl(new maplibregl.FullscreenControl());
map.addControl(
  new maplibregl.ScaleControl({
    maxWidth: 100,
    unit: "metric",
  })
);

map.addControl(new maplibregl.GeolocateControl());
map.addControl(new maplibregl.LogoControl({ compact: false }));
