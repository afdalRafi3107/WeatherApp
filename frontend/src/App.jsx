import { useState } from "react";
import axios from "axios";
import { WeatherCard } from "./weatherCard/card";
import Lottie from "lottie-react";
import bgAnia from "../src/assets/img/bg.json";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = import.meta.env.VITE_BASE_API;

  const handleClick = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeatherData(null);
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setError("");

    try {
      const res = await axios.get(`${api}/weather`, {
        params: { city: city.trim() },
      });
      setWeatherData(res.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.err || "City not found or failed to fetch data.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center pt-12 pb-8 px-4 overflow-hidden text-white">
        <Lottie
          animationData={bgAnia}
          loop
          autoplay
          className="absolute inset-0 w-full h-full z-0"
          style={{
            objectFit: "cover",
            transform: "scale(1.2)",
          }}
        />

        <div className="relative z-10 w-full max-w-lg md:max-w-xl text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            AuraForecast
          </h1>
          <p className="text-lg md:text-xl text-cyan-200 mb-5 font-light tracking-wider drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
            Forecast the Future, Feel the Aura
          </p>

          <form
            onSubmit={handleClick}
            className="flex rounded-2xl overflow-hidden w-full bg-white/5 backdrop-blur-lg shadow-[0_0_25px_rgba(147,51,234,0.3)] border border-white/10 focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-300"
          >
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-14 p-4 text-white text-lg bg-transparent placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-purple-500 hover:to-cyan-400 px-6 py-3 text-lg font-semibold transition-all duration-200 flex-shrink-0 active:scale-95"
            >
              Search
            </button>
          </form>

          <div className="mt-8 w-full min-h-[40px]">
            {loading && (
              <p className="text-cyan-300 text-center text-lg animate-pulse bg-white/10 p-3 rounded-xl shadow-md">
                Fetching data...
              </p>
            )}
            {error && (
              <p className="text-pink-300 bg-purple-800/50 border border-pink-500/40 p-4 rounded-xl text-center font-medium shadow-lg transition-opacity duration-500">
                🚨 {error}
              </p>
            )}
          </div>
        </div>

        {weatherData && (
          <div className="relative z-10 mt-10 flex justify-center w-full max-w-xl">
            <WeatherCard data={weatherData} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
