import { useState } from 'react'


function App2() {
  // Temperature
  const [temp, setTemp] = useState(0);
  const [convert, setConvert] = useState("Celcius")
  const [isBoiling, setIsBoiling] = useState(false);



  return (
    <> 
      <h1>Temperature</h1>
      <label>Temp</label>
      <input type="text" />
      <input type="text" />
    </>
  )
}

export default App2




