import React, { useState, useEffect } from "react";
import WeatherProvider from "./WeatherProvider";

interface Props {
  weather_provider: WeatherProvider;
  update_interval: number;
}

export default function App(props: Props) {
  const [is_loaded, set_is_loaded] = useState(false);
  const [error, set_error] = useState("");
  const [data, set_data] = useState({ temp: 0, feels_like: 0 });

  function update(provider: WeatherProvider) {
    provider
      .fetch()
      .then((result) => {
        set_is_loaded(true);
        set_data(result);
        set_error("");
      })
      .catch((error: Error) => {
        console.log(`Weather error: ${error}`);
        set_is_loaded(true);
        set_error(error.message);
      });
  }

  useEffect(() => {
    update(props.weather_provider);
    const id = setInterval(() => {
      update(props.weather_provider);
    }, props.update_interval);
    return () => clearInterval(id);
  }, [props.weather_provider, props.update_interval]);

  if (!is_loaded) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "white" }}>Error: {error}</div>;
  }

  return (
    <div
      style={{
        color: "white",
        fontSize: "8vmin",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div>Temp: {data.temp.toFixed(0)} °C</div>
      <div>Feels: {data.feels_like.toFixed(0)} °C</div>
    </div>
  );
}
