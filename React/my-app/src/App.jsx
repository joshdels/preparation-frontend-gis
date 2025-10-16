import { useState } from 'react'
import Box  from './Box'
import './index.css';


export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Hello</h1>
      <Box />
      <button onClick={handleClick}>
        Click Me {count}
      </button>
    </>
  )
}






