// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

// const map = new maplibregl.Map({
//   container: 'map',
//   style: 'https://demotiles.maplibre.org/style.json',
//   center: [0, 0],
//   zoom: 2,
// });

// map.on('click', (e) => {
//   console.log('A click event' + e.lngLat)
// });

// map.addControl(new maplibregl.FullscreenControl(), 'top-right');
// map.addControl(new maplibregl.NavigationControl(), 'top-right');

// new maplibregl.Marker().setLngLat([120, 15]).addTo(map);
// map.addSource('points', {
//   type: 'geojson',
//   data: 'points.geojson',
// });

// map.addLayer({
//   id: 'points',
//   type: 'circle',
//   source: 'points',
//   paint: { 'circle-color': '#007cbf' },
// });


import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import {Map} from 'maplibre-gl'

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0,0],
  zoom: 2
})

const marker = new maplibregl.Marker()
    .setLngLat([12.550343, 55.665957])
    .addTo(map);

// GeoJson
map.on('load', function () {
  map.addSource('geojson-source', {
    type: 'geojson',
    data: 'layers.geojson',
  });

  map.addLayer({
    id: 'geojson-layer',
    type: 'fill',
    source: 'geojson-source',
    paint: {
      'fill-color': '#0080ff',
      'fill-opacity': 0.5,
    },
  });
});