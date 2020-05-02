import React, { useState, useEffect } from "react";
import WeatherProvider from "./WeatherProvider";

interface Props {
  weather_provider: WeatherProvider;
}

export default function Weather(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");
  const [temp, setTemp] = useState<string>("");
  const [feelsLike, setFeelsLike] = useState<string>("");

  useEffect(() => {
    function update() {
      props.weather_provider
        .fetch()
        .then((result) => {
          setTemp(result.temp.toFixed(0));
          setFeelsLike(result.feels_like.toFixed(0));
          setIsLoaded(true);
        })
        .catch((error: Error) => {
          setError(error.message);
          setIsLoaded(true);
        });
    }

    update();
  }, [props.weather_provider]);

  if (error) {
    return <div style={{ color: "white" }}>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div style={{ color: "white" }}>Loading...</div>;
  } else {
    return (
      <div
        style={{
          color: "white",
          fontSize: "6vmin",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div>Temp: {temp} °C</div>
        <div>Feels: {feelsLike} °C</div>
      </div>
    );
  }
}
