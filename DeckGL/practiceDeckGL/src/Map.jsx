import { MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { DeckGL } from 'deck.gl';

async function initialize() {
  config.apiKey = 'YOUR_MAPTILER_API_KEY_HERE';

  // Create deck.gl map
  const deckgl = new DeckGL({
    container: 'map',
    map: maptilersdk,
    mapStyle: MapStyle.STREETS,
    mapOptions: { geolocateControl: false, navigationControl: false },
    initialViewState: {
      longitude: -73.97,
      latitude: 40.72,
      zoom: 11,
      pitch: 60
    },
    controller: true
  });

  return (
    <>
    <div id="map"></div>
    </>
  )
}

initialize();