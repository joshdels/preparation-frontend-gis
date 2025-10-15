import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import {Map} from 'maplibre-gl'

// MAP  
const map = new Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/bright',
  center: [-77.04, 38.907],
  zoom: 3
})

// Events
// map.on('load', ()=> {
//     map.addLayer({
//         id: 'points-of-interest',
//         source: {
//             type: 'vector',
//             url: 'https://maplibre.org/maplibre-style-spec/'
//         },
//             'source-layer': 'poi_label',
//         type: 'circle',
        
//     })
// })



// POPUP
const popup = new maplibregl.Popup({offset: 25}).setText('Hello Mate')

// MARKER
const marker = new maplibregl.Marker()
    .setLngLat([12.550343, 55.6659657])
    .setPopup(popup)
    .addTo(map)

// map.flyTo({
//   center: marker.getLngLat(),
//   zoom: 14,
//   speed: 2,
// });

map.on('load', () => {
    
    // FETCH DATA
    map.addSource('places', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/countries.geojson'
    });

    map.addLayer({
        id: 'places-layer',
        type: 'fill',
        source: 'places',
        paint: {
            'fill-color': '#bf0000',
            'fill-opacity': 0.4
        }
    });

    // ANINMATION
    map.on('click', 'places-layer', (e) => {
        const country = e.features[0];
        const name = country.properties.name;

        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`Hello ${name}`)
          .addTo(map);
    });

    map.on('mouseenter', 'places-layer', () => {
        map.getCanvas().style.cursor= 'pointer';
    });

    map.on('mouseleave', 'places-layer', () => {
        map.getCanvas().style.cursor = '';
    })

})



    

