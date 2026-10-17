
import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch weather using city name or coordinates
  const fetchWeather = async (url) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setCity(response.data.name);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else if (err.response?.status === 401) {
        setError(
          "API key is invalid or not activated yet. Please try again later."
        );
      } else {
        setError("Unable to fetch weather data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Search weather by city name
  const searchWeather = (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city.trim())}` +
      `&appid=${API_KEY}&units=metric`;

    fetchWeather(url);
  };

  // Get weather using current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Latitude:", latitude);
console.log("Longitude:", longitude);

        const url =
          `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=${latitude}&lon=${longitude}` +
          `&appid=${API_KEY}&units=metric`;

        await fetchWeather(url);
      },
      () => {
        setError("Please allow location access in your browser.");
        setLoading(false);
      }
    );
  };

  return (
    <section className="weather-section">
      <h1>🌦️ Weather Report</h1>

      <p className="subtitle">
        Discover the weather in your city
      </p>

      <form onSubmit={searchWeather}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <button
        type="button"
        className="location-button"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        📍 Use My Location
      </button>

      {loading && (
        <p className="loading-message">
          Loading weather information...
        </p>
      )}

      {error && <p className="error-message" role="alert">{error}</p>}

      {weather && (
        <article className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width="100"
            height="100"
          />

          <h3>{Math.round(weather.main.temp)}°C</h3>

          <p className="weather-description">
            {weather.weather[0].description}
          </p>

          <div className="weather-details">
            <div>
              <span>🌡️</span>
              <p>Feels Like</p>
              <strong>{Math.round(weather.main.feels_like)}°C</strong>
            </div>

            <div>
              <span>💧</span>
              <p>Humidity</p>
              <strong>{weather.main.humidity}%</strong>
            </div>

            <div>
              <span>💨</span>
              <p>Wind Speed</p>
              <strong>{weather.wind.speed} m/s</strong>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default Weather;

