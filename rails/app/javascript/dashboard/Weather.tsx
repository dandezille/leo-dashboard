import React, { useState, useEffect } from 'react';

import { useInterval } from './support/Interval';

export interface WeatherData {
  temp: number;
}

export type GetWeather = () => Promise<WeatherData>;

export async function get_open_weather_map_data(): Promise<WeatherData> {
  console.log('Updating weather');
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

function useWeather(get_weather: GetWeather, update_interval: number) {
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState('');
  const [temp, set_temp] = useState(0);

  function update() {
    get_weather()
      .then((result) => {
        set_loading(false);
        set_temp(result.temp);
        set_error('');
      })
      .catch((error: Error) => {
        console.log(`Weather error: ${error}`);
        set_loading(false);
        set_error(error.message);
      });
  }

  useInterval(update, update_interval);

  return [loading, error, temp];
}

export default function App(props: Props) {
  const [loading, error, temp] = useWeather(
    props.get_weather,
    props.update_interval
  );

  if (loading) {
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
      {(+temp).toFixed(0)} °C
    </div>
  );
}
