import { useState, useEffect } from "react";
const API_URL =
  "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto";


const GEO_URL =
  "https://geocoding-api.open-meteo.com/v1/search";


  function getWeatherDescription(code) {
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95) return "Thunderstorm";

  return "Unknown";
}





function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const currentHour = new Date().getHours();

  useEffect(() => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      setWeather(data);
    });
}, []);


const handleSearch = () => {
  if (!city) return;

  fetch(`${GEO_URL}?name=${city}&count=1&language=en&format=json`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results) {
        setError("Location not found");
        return;
      }
      
      setError("");

      const { latitude, longitude } = data.results[0];
      setLocation(data.results[0].name);

      const weatherURL = `${API_URL}&latitude=${latitude}&longitude=${longitude}`;
      
  fetch(weatherURL)
    .then((response) => response.json())
    .then((weatherData) => {
    setWeather(weatherData);
  
  });
    
  });
};
 


  return (
   <main className="min-h-screen bg-slate-950 text-white">

   {error && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="rounded-xl bg-slate-800 px-6 py-4 text-center shadow-xl">
      <p className="text-sm text-red-400">{error}</p>
      <button
        className="mt-3 rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
        onClick={() => setError("")}
      >
        Close
      </button>
    </div>
  </div>
)}

    
{/* Header */}
    <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <h1 className="text-xl font-semibold">
            Weather App
          </h1>

 {/* Search */}
        <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}

              

              className="w-full rounded-l-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm outline-none focus:border-blue-400"
            />

            <button className="rounded-r-full bg-blue-600 px-6 hover:bg-blue-500"
              onClick={handleSearch}>
              Search
            </button>
           
          </div>   

        </div>
      </header>

   {/* Main Content */}
    <div className="mx-auto max-w-7xl px-6 py-10">

       {/* Current Weather */}
        <section className="grid gap-10 border-b border-slate-800 pb-12 md:grid-cols-2">
        
         <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              {location}
            </p>

            <p className="mt-1 text-slate-400">
              {weather?.current?.time &&
               new Date(weather.current.time).toLocaleDateString("en-US", {
               weekday: "long",
               month: "long",
               day: "numeric",
               year: "numeric",
            
            })}
            </p>

            <div className="mt-6 flex items-start">
              
              <span className="text-8xl font-light">
                {weather?.current?.temperature_2m}  
              </span>

              <span className="mt-4 text-3xl text-slate-400">
                °F
              </span>
            </div>

            <p className="mt-6 text-2xl text-slate-300">
              {getWeatherDescription(weather?.current?.weather_code)}
            </p>

            <p className="mt-1 text-slate-500" >
              Feels like {weather?.current?.apparent_temperature}°F
            </p>
          </div>


  {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Humidity
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {weather?.current?.relative_humidity_2m}%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Wind
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {weather?.current?.wind_speed_10m} mph
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Chance of Rain
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {weather?.hourly?.precipitation_probability[currentHour]}%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                UV Index
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {weather?.daily?.uv_index_max?.[0]}
              </p>
            </div>

          </div>

        </section>
</div>



{/* Hourly Forecast */}
        <section className="mx-auto max-w-7xl px-6py-10">

          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Hourly Forecast
          </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">

            {[
              ["9 AM", "☀️", "58°"],
              ["12 PM", "🌤️", "63°"],
              ["3 PM", "🌤️", "65°"],
              ["6 PM", "🌙", "61°"],
              ["9 PM", "🌙", "56°"],
              ["12 AM", "🌙", "54°"],
            ].map(([time, icon, temperature]) => (
              <div
                key={time}
                className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center"
              >
                <p className="text-sm text-slate-400">
                  {time}
                </p>

                <p className="my-5 text-3xl">
                  {icon}
                </p>

                <p className="text-xl font-semibold">
                  {temperature}
                </p>
              </div>
            ))}

          </div>
        </section>  


    {/* 5-Day Forecast */}
        <section className="mx-auto max-w-7xl px-1 py-10">

          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
            5-Day Forecast
          </h2>

          <div className="space-y-3">

            {[
              ["Mon", "🌤️", "Cloudy", "52°", "65°"],
              ["Tue", "☀️", "Sunny", "54°", "68°"],
              ["Wed", "🌧️", "Rainy", "50°", "60°"],
              ["Thu", "☁️", "Cloudy", "49°", "59°"],
              ["Fri", "🌤️", "Partly Cloudy", "51°", "63°"],
            ].map(([day, icon, condition, low, high]) => (
              <div
                key={day}
                className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-5"
              >

                <div className="flex items-center gap-5">
                  <span className="w-10 font-semibold">
                    {day}
                  </span>

                  <span className="text-2xl">
                    {icon}
                  </span>

                  <span className="text-slate-400">
                    {condition}
                  </span>
                </div>

                <div className="flex gap-5">
                  <span className="text-slate-500">
                    {low}
                  </span>

                  <span className="font-semibold">
                    {high}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>

               
   
   </main>
  )
}

export default App
