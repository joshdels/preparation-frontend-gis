import { useState } from 'react'

const users = [
  {"id": 1, "name": "John", },
  {"id": 2, "name": "Joshua", },
  {"id": 3, "name": "Maria", },
]

function App4() {
  // Simple User List
  const [userFilter, setUserFilter] = useState('')
  const [filterUser, setFilterUser] = useState(users)

  function handleTextInFilter(e) {
    setUserFilter(e.target.value);
  }
  
  function handleFilter(){
    const results = users.filter(u=>
      u.name.toLowerCase().includes(userFilter.toLowerCase())
    )
    setFilterUser(results)
  }

  return (
    <>
      <h1>Simple User List</h1>
      <SearchBar 
        onSearch={handleTextInFilter}
        onSubmit={handleFilter}
      />
      <UserList 
        data={filterUser}  
      />
    </>
  )
}

export default App4


function SearchBar({ onSearch, onSubmit }) {
  return (
    <>
      <input 
        type="text" 
        placeholder='search' 
        onChange={onSearch}
      />
      <button
        onClick={onSubmit}
      >
        Search
      </button>
    </>
  )
}

function UserList({ data }) {
  return (
    <>
    {data.map(d => (
      <ul key={d.id}>
        <li>{d.name}</li>
      </ul>
    ))}
    </>
  )
}

//Ganna review this one, very tired today


