import React, { useState, useCallback } from 'react';
import { DeckGL } from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';

export default function MultiViewDeck() {
  const [viewState, setViewState] = useState({
    main: { longitude: -122.4, latitude: 37.8, zoom: 12, pitch: 30 },
    minimap: { longitude: -122.4, latitude: 37.8, zoom: 5 }
  });

  const handleViewStateChange = useCallback(({ viewId, viewState: newViewState }) => {
    if (viewId === 'main') {
      setViewState(current => ({
        main: newViewState,
        minimap: { ...current.minimap, longitude: newViewState.longitude, latitude: newViewState.latitude }
      }));
    } else {
      setViewState(current => ({
        main: current.main,
        minimap: { ...current.minimap, zoom: newViewState.zoom }
      }));
    }
  }, []);

  const layers = [
    new ScatterplotLayer({
      id: 'points',
      data: [{ position: [-122.4, 37.8] }],
      getPosition: d => d.position,
      getRadius: 50000,
      getFillColor: [255, 0, 0]
    })
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <DeckGL
        views={[
          new MapView({ id: 'main', controller: true }),
          new MapView({ id: 'minimap', x: 0, y: 5, width: 100, height: 200, controller: true })
        ]}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        layers={layers}
        style={{ width: '100%', height: '100%' }}
      />
      {/* Mini-map border */}
      <div
        style={{
          position: 'relative',
          top: 10,
          left: 10,
          width: 300,
          height: 200,
          border: '2px solid black',
          pointerEvents: 'none' // allow clicks to pass through
        }}
      />
    </div>
  );
}
