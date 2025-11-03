import React, { useEffect, } from "react";
import useDatabaseStore  from "./store/useDatabaseStore.jsx"

function App2() {
  const {
    name, age, filter, result, 
    setName, setAge, setFilter, 
    initDuckDB, insertPerson, filterPeople
  } = useDatabaseStore();

  useEffect(() => { initDuckDB(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    insertPerson(name, age);
  }

  const handleFilter = (e) => {
    e.preventDefault();
    filterPeople(filter);
  }

  return (
    <div>
      <h2>DuckDB + React + Vite</h2>
      <div>
        <h1>Add Data</h1>
        <form onSubmit={handleSubmit}>
        <label>Add Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <label>Age</label>
        <input 
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}  
        />
        <button type="submit">Submit</button>
      </form>
      </div>
      <div>
        <form onSubmit={handleFilter}>
          <label>Filter</label>
          <input 
            type="text" 
            value={filter}
            onChange={(e => setFilter(e.target.value))}
          />
          <button type="submit">Filter</button>
        </form>
      </div>
      <pre>{JSON.stringify(result, null, 3)}</pre>
    </div>
  );
}

export default App2;
