
import React from "react";

function Forecast() {
  const forecastDays = [
    { day: "Monday", icon: "☀️", condition: "Sunny", temp: 32 },
    { day: "Tuesday", icon: "⛅", condition: "Partly Cloudy", temp: 30 },
    { day: "Wednesday", icon: "🌧️", condition: "Rainy", temp: 27 },
    { day: "Thursday", icon: "⛈️", condition: "Thunderstorm", temp: 26 },
    { day: "Friday", icon: "🌤️", condition: "Mostly Sunny", temp: 31 },
  ];

  return (
    <section className="forecast-section">
      <h2>5-Day Forecast</h2>
      <p className="forecast-subtitle">
        Weather outlook for the next five days
      </p>

      <div className="forecast-list">
        {forecastDays.map((item) => (
          <div className="forecast-card" key={item.day}>
            <h3>{item.day}</h3>
            <span className="forecast-icon">{item.icon}</span>
            <p>{item.condition}</p>
            <strong>{item.temp}°C</strong>
          </div>
        ))}
      </div>

      <p className="forecast-note">
        Demo data only — live forecast will be connected later.
      </p>
    </section>
  );
}

export default Forecast;

