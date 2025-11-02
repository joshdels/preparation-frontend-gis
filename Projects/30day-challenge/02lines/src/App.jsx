import { useState } from 'react'
import MapComponent from './components/MapComponent'
import Panel from './components/Panel';

function App() {
  const [zoom, setZoom] = useState(0);

  return (
    <>
      <Panel zoom={zoom}/>
      <MapComponent setZoom={setZoom}/>
    </>
  )
}

export default App
