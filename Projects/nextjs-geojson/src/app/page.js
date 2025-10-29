'use client'

import MapComponent from "../../components/mapComponent";
import { useMapToggler } from '../../hooks/useMapToggler';

export default function Home() {
  const { isOn, toggle } = useMapToggler();

  return (
    <div>
      <MapComponent />
      <h1>Hello</h1>
      <p>Light is: {isOn ? 'on' : 'off'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
