import React, { useState, useEffect } from "react";

interface Error {
  message: string;
}

function log(arg: any) {
  console.log(arg);
  return arg;
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
      .then(log)
      .then(
        (result) => {
          setTemp(result.main.temp);
          setFeelsLike(result.main.feels_like);
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
      <div style={{ color: "white" }}>
        <div>Temp: {temp}</div>
        <div>Feels Like: {feelsLike}</div>
      </div>
    );
  }
}
