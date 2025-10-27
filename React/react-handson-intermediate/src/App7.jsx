// 🪝 15. Custom Hook – useLocalStorage

// Concepts: Custom Hooks, State Persistence
// 🧩 Goal:
// Create a useLocalStorage(key, initialValue) hook.
// Replace normal useState with your custom hook in any project (like Theme or Counter).
// 🎯 Bonus:
// Add support for JSON objects (auto parse/stringify).

import useCounter from "./hooks/useCounter"

export default function App7() {
  const {count, increment, decrement, reset } = useCounter(0);
  return (
    <>
      <p>Count A: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}