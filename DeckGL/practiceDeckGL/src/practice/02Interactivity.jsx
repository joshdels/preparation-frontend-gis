import React, { useState, useCallback } from 'react';
import { DeckGL } from '@deck.gl/react';
import { FlyToInterpolator } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';

const CITIES = {
  SF: {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 5,
    name: 'San Francisco'
  },
  NYC: {
    longitude: -74.0,
    latitude: 40.7,
    zoom: 5,
    name: 'New York City'
  },
};

export default function Interactivity() {
  const [initialViewState, setInitialViewState] = useState(CITIES.NYC);

  const flyToCity = useCallback((evt) => {
    const city = CITIES[evt.target.id];
    if (!city) return;
    setInitialViewState({
      ...city,
      transitionInterpolator: new FlyToInterpolator({ speed: 5 }),
      transitionDuration: 'auto',
    });
  }, []);

  const layers = [
    new ScatterplotLayer({
      id: 'cities',
      data: Object.values(CITIES),
      getPosition: (d) => [d.longitude, d.latitude],
      getFillColor: [255, 0, 0],
      getRadius: 50000,
      pickable: true,
      onHover: (info, event) => {
        console.log('Hovered:', info.object)
      } ,
      onClick: (info, event) => {
        console.log('Clicked:', info, event)
      } 
    }),
    new TextLayer({
      id: 'city-labels',
      data: Object.values(CITIES),
      getPosition: (c) => [c.longitude, c.latitude],
      getText: (c) => c.name,
      getSize: 16,
      getColor: [255, 255, 255, 255],
      getTextAnchor: 'start',
      getAlignmentBaseline: 'top',
      getPixelOffset: [0,-50]
    }),
  ];

  const getTooltip = ({object}) => {
    if (!object) return null; // nothing hovered
    return `City: ${object.name}\nLongitude: ${object.longitude}\nLatitude: ${object.latitude}`;
  };


  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DeckGL
        initialViewState={initialViewState}
        controller
        layers={layers}
        getTooltip={getTooltip}
        getCursor={({isDragging, isHovering}) => {
          if (isDragging) return 'grabbing';
          if (isHovering) return 'pointer';
          return 'default'
        }}
      />
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        {Object.keys(CITIES).map((name) => (
          <button key={name} id={name} onClick={flyToCity}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
