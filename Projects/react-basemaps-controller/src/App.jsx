import React from "react";
import { useState } from "react";
import MapComponent from "./component/MapComponent";
import Button from "./component/Button";

const basemaps = [
  {
    id: 1,
    name: "light",
    basemap: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
  },
  {
    id: 2,
    name: "dark",
    basemap: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
  },
  {
    id: 3,
    name: "satellite",
    basemap: "https://tiles.stadiamaps.com/styles/alidade_satellite.json",
  },
];

export default function App() {
  const [basemap, setBasemap] = useState(basemaps[0].basemap);
  const [coords, setCoords] = useState({ lng: 121, lat: 14});
  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(index) {
    setBasemap(basemaps[index].basemap)
    setActiveIndex(index)
  }

  return (
    <div className="App">
      <h1>My MapLibre React App</h1>
      <MapComponent basemap={basemap} setCoords={setCoords}/>

      {basemaps.map((map, index) => 
        <Button 
          key={map.id} 
          name={map.name}
          isActive={activeIndex === index}
          onClick={() => handleClick(index)}
        >
        </Button>
      )}
      <div className="Coordinates">
        <h1>Coordinates</h1>
        <p>
          Longtitude: {coords.lng} | Latitude: {coords.lat}
        </p>
      </div>
    </div>
  );
}
