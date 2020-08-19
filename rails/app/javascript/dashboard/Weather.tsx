import React, { useState, useEffect } from 'react';

import { useInterval } from './support/Interval';

interface WeatherData {
  temp: number;
}

async function get(request : RequestInfo) : Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

async function get_weather(): Promise<WeatherData> {
  console.log('Updating weather');
  const data = await get('/weather.json');
  return {
    temp: data.main.temp,
  };
}

function useWeather(update_interval: number) {
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

interface Props {
  update_interval: number;
}

export default function Weather(props: Props) {
  const [loading, error, temp] = useWeather(props.update_interval);

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
