import React, { useState, useEffect } from "react";
import { Map } from "react-map-gl/maplibre";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { DeckGL } from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import { animate } from "popmotion";

const DATA_URL = {
  BUILDINGS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json",
  TRIPS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json",
};

const ambientLight = new AmbientLight({ color: [255, 255, 255], intensity: 1 });
const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2,
  position: [-74.05, 40.7, 8000],
});
const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const DEFAULT_THEME = {
  buildingColor: [230, 230, 230],
  trailColor0: [255,100, 50],
  trailColor1: [0, 136, 204],
  material: {
    ambient: 0.2,
    diffuse: 0.8,
    shininess: 50,
    specularColor: [255, 255, 255],
  },
  effects: [lightingEffect],
};

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 14,
  pitch: 50,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const landCover = [
  [
    [-74.0, 40.7],
    [-74.02, 40.7],
    [-74.02, 40.72],
    [-74.0, 40.72],
  ],
];

export default function Cities() {
  const [time, setTime] = useState(0);
  const [tripData, setTripData] = useState(null);
  const [buildingData, setBuildingData] = useState(null);

  // Load data
  useEffect(() => {
    Promise.all([
      fetch(DATA_URL.TRIPS).then((res) => res.json()),
      fetch(DATA_URL.BUILDINGS).then((res) => res.json()),
    ]).then(([trips, buildings]) => {
      setTripData(trips);
      setBuildingData(buildings);
    });
  }, []);

  // Animate cars
  useEffect(() => {
    const animation = animate({
      from: 1000,
      to: 2000,
      duration: 60000, // 60 seconds loop
      repeat: Infinity,
      onUpdate: setTime,
    });
    return () => animation.stop();
  }, []);

  if (!tripData || !buildingData) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  const layers = [
    new PolygonLayer({
      id: "ground",
      data: landCover,
      getPolygon: (f) => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0],
    }),
    new TripsLayer({
      id: "trips",
      data: tripData,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: [253, 128, 93],
      opacity: 0.5,
      widthMinPixels: 2,
      trailLength: 180,
      currentTime: time,
      jointRounded: true,
      capRounded: true,
    }),
    new PolygonLayer({
      id: "buildings",
      data: buildingData,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: (f) => f.polygon,
      getElevation: (f) => f.height,
      getFillColor: DEFAULT_THEME.buildingColor,
      material: DEFAULT_THEME.material,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      effects={DEFAULT_THEME.effects}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      glOptions={{ webgl2: false }} // ✅ fixed typo
    >
      <Map reuseMaps mapStyle={MAP_STYLE} />
    </DeckGL>
  );
}
