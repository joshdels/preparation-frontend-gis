import { useState } from 'react'
import { Greetings } from './Greetings'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}> Increment </button>
      <Greetings name="Joshua" age={25} />
    </>
  )
}

export default App
