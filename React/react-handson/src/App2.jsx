import { useState } from 'react'


function App2() {
  // Temperature Converter
  const [temp, setTemp] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);



  function handleTemp(e) {
    setTemp(Number(e.target.value));
  }

  function convertTemp(value, toCelsius) {
    return toCelsius ? (value - 32) * 5/9 : (value * 9/5) + 32;
  }

  function handleSubmitConvert() {
    setTemp(convertTemp(temp, !isCelsius));
    setIsCelsius(!isCelsius);
  }

  return (
    <> 
      <h1>Temperature</h1>
      <label>Temp</label>
      <input 
        type="number"
        value={temp}
        onChange={handleTemp}
      />
      <button
        onClick={handleSubmitConvert}
      >
        Convert to {isCelsius ? "°F" : "°C"}
      </button>
      <p>
        {
          ((isCelsius && temp >= 100) 
          || (!isCelsius && temp >= 212))
          && "100 C reached!"
        }
      </p>
    </>
  )
}

export default App2




