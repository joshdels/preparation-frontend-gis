export function FilterBar({ onFilter, onClick }) {
  return (
    <>
      <input type="text" onChange={onFilter} placeholder="Enter city..." />
      <button onClick={onClick}>Get Weather</button>
    </>
  );
}


