import React, { useState, useEffect } from 'react';

export interface WeatherData {
  temp: number;
}

export type GetWeather = () => Promise<WeatherData>;

export async function get_open_weather_map_data(): Promise<WeatherData> {
  const response = await fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=d69dc974f03525bb28591d7132bbf921'
  );

  const data = await response.json();
  return {
    temp: data.main.temp,
  };
}

interface Props {
  get_weather: GetWeather;
  update_interval: number;
}

export default function App(props: Props) {
  const [is_loaded, set_is_loaded] = useState(false);
  const [error, set_error] = useState('');
  const [temp, set_temp] = useState(0);

  function update(get_weather: GetWeather) {
    get_weather()
      .then((result) => {
        set_is_loaded(true);
        set_temp(result.temp);
        set_error('');
      })
      .catch((error: Error) => {
        console.log(`Weather error: ${error}`);
        set_is_loaded(true);
        set_error(error.message);
      });
  }

  useEffect(() => {
    update(props.get_weather);
    const id = setInterval(() => {
      update(props.get_weather);
    }, props.update_interval);
    return () => clearInterval(id);
  }, [props.get_weather, props.update_interval]);

  if (!is_loaded) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  return (
    <div
      style={{
        color: 'white',
        fontSize: '12vmin',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {temp.toFixed(0)} °C
    </div>
  );
}
