import { useState } from 'react'
import './App.css'
import useCounterStore from './store/useCounter'

export default function App() {
  const {count, increment, decrement} = useCounterStore();

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}


