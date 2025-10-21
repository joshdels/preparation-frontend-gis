export function CityInformation({ city, results }) {

  const tempC = (results.main?.temp - 273.15).toFixed(1);
  const condition = results.weather?.[0]?.main.toLowerCase();
  const details = results.weather?.[0]?.description

  const messages = {
    clear: "☀️ It's a bright and sunny day!",
    rain: "🌧️ Don't forget your umbrella!",
    clouds: "☁️ It's cloudy today.",
    snow: "❄️ It's snowing, stay warm!",
  };

  const message = messages[condition] || "🌈 Weather looks fine today.";

  return (
    <>
      <h2>{city.toUpperCase()}</h2>
      <p>Temperature: {tempC} °C</p>
      <p>Details: {details}</p>
      <p> {message}</p>
    </>
  );
}