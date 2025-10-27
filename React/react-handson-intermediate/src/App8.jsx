// 🧠 16. Custom Hook – useFetch

// Concepts: Custom Hooks, useEffect, Error Handling
// 🧩 Goal:
// Build a useFetch(url) hook to handle loading, error, and data states.
// Use it to fetch and render a list of posts or users (from JSONPlaceholder API).
// 🎯 Bonus:
// Add “Refresh Data” button.
// Handle cancelled requests gracefully.
import handleData from "./hooks/handleData";

export default function App8() {

  const {data, isLoading, error, refetch } = handleData(
    'https://jsonplaceholder.typicode.com/todos/1' 
  );


  if (isLoading) return <p>Loading mate....</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h3>{data.title} </h3>
      <button onClick={refetch}>Refresh</button>
    </div>
  )

}