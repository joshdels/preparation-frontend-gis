import { useState, useEffect } from 'react';

export default function App2() {
  const [city, setCity] = useState('');
  const [results, setResults] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.WEATHER_API_KEY;

  function handleFilter(e) {
    setCity(e.target.value);
  }

  function handleClick() {
    if (!city) return;
    setIsLoading(true);
    setError('');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => {
        setResults(data);
        setIsSuccess(true);
        localStorage.setItem('lastCity', city);
      })
      .catch(err => {
        setError(err.message);
        setIsSuccess(false);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lastCity}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setIsSuccess(true);
        });
    }
  }, []);

  return (
    <>
      <h1>🌤 Weather Fetcher</h1>
      <FilterBar onFilter={handleFilter} onClick={handleClick} />
      <br />
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {!isLoading && !error && isSuccess && results && (
        <CityInformation city={city} results={results} />
      )}
    </>
  );
}

function FilterBar({ onFilter, onClick }) {
  return (
    <>
      <input type="text" onChange={onFilter} placeholder="Enter city..." />
      <button onClick={onClick}>Get Weather</button>
    </>
  );
}

function CityInformation({ city, results }) {
  return (
    <>
      <h2>{city.toUpperCase()}</h2>
      <p>🌤 Condition: {results.weather?.[0]?.main}</p>
      <p>🌡 Temperature: {(results.main?.temp - 273.15).toFixed(1)} °C</p>
    </>
  );
}
