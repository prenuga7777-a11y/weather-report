import React from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  return (
    <main>
      <Weather />
      <Forecast />
    </main>
  );
}

export default App;