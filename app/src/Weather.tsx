import React, { useState, useEffect } from "react";

interface Error {
  message: string;
}

export default function Weather() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=d69dc974f03525bb28591d7132bbf921"
    )
      .then((res) => res.json())
      .then(
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
