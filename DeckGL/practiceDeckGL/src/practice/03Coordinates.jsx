import React from 'react';
import { DeckGL } from '@deck.gl/react';
import { PointCloudLayer } from '@deck.gl/layers';

export default function Coordinates() {
  const layers = [
    new PointCloudLayer({
      id: 'pointcloud',
      data: [
        { position: [-122.399, 37.79, 10] }, 
      ],
      getPosition: d => d.position,
      pointSize: 10,
      pickable: true,
    }),
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DeckGL
        initialViewState={{
          longitude: -122.4004935,
          latitude: 37.7900486,
          zoom: 15,
          pitch: 30,
          bearing: 0
        }}
        controller
        layers={layers}
      />
    </div>
  );
}
