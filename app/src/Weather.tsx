import React, { useState, useEffect } from "react";

interface Error {
  message: string;
}

interface WeatherProvider {
  fetch(): any;
}

class WeatherProviderImplementation implements WeatherProvider {
  async fetch() {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=d69dc974f03525bb28591d7132bbf921"
    );

    return await response.json();
  }
}

export default function Weather() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);

  useEffect(() => {
    const weather_provider = new WeatherProviderImplementation();
    weather_provider.fetch().then(
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
  }, []);

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
