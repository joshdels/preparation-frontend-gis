import { useState } from 'react'

export default function App() {
  // Counter Dashboazrd
  // Parent
  const [total, setTotal] = useState(0)
  const [counts, setCounts] = useState({ A:0, B:0, C:0 })

  
  function handleIncrement(name) {
    setCounts((prev) => ({ ...prev, [name]: prev[name] + 1}));
    setTotal((prev) => prev + 1);
  }

  function handleReset() {
    setCounts({ A:0, B:0, C:0 })
    setTotal(0)
  }
  
  return (
    <>
      <h1>Counter Dashboard</h1>
      <span>Total count : {total} </span>
      <button onClick={handleReset}> Reset </button>

      <Counter name="A" count={counts.A} onIncrement={handleIncrement} />
      <Counter name="B" count={counts.B} onIncrement={handleIncrement} />
      <Counter name="C" count={counts.C} onIncrement={handleIncrement} />
    </>
  )
}

function Counter ({ name, count, onIncrement }) {
  // Child
  return (
    <>
      <p>Counter {name}</p>
      <button onClick={() => onIncrement(name)}> Count: {count} </button>
    </>
  )
} 