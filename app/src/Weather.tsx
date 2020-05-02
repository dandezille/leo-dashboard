import React, { useState, useEffect } from "react";
import WeatherProvider from "./WeatherProvider";

interface Error {
  message: string;
}

interface Props {
  weather_provider: WeatherProvider;
}

export default function Weather(props: Props) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);

  useEffect(() => {
    props.weather_provider.fetch().then(
      (result) => {
        setTemp(result.main.temp.toFixed(0));
        setFeelsLike(result.main.feels_like.toFixed(0));
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    );
  }, [props.weather_provider]);

  if (error) {
    return <div style={{ color: "white" }}>Error: {error.message}</div>;
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
