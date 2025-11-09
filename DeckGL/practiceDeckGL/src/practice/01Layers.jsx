import { DeckGL } from '@deck.gl/react';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';

const flights = [
  { lon: -122.39, lat: 37.62, alt: 1800, callSign: 'SKW 3342' },
  { lon: -122.41, lat: 37.65, alt: 2200, callSign: 'UAL 1123' },
  { lon: -122.43, lat: 37.63, alt: 1500, callSign: 'DAL 4412' },
  { lon: -122.38, lat: 37.66, alt: 2000, callSign: 'AAL 231' },
  { lon: -122.42, lat: 37.64, alt: 1700, callSign: 'SWA 983' }
];


export default function Layers() {
  const layers = [
    new ScatterplotLayer({
      id: 'circles',
      data: flights,
      getPosition: d => [d.lon, d.lat, d.alt],
      getFillColor: [255, 255, 255],
      getRadius: 5,
      radiusUnits: 'pixels'
    }),
    new TextLayer({
      id: 'labels',
      data: flights,
      getText: d => d.callSign,
      getPosition: d => [d.lon, d.lat, d.alt],
      getSize: 12
    })
  ];

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.44,
        latitude: 37.76,
        zoom: 8,
      }}
      controller={true}
      layers={layers}
    />
  );
}
