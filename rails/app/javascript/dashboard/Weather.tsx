import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { get } from './support/HTTP';

const weather_main_decoder = JsonDecoder.object<WeatherMain>(
  {
    temp: JsonDecoder.number,
  },
  'WeatherMain'
);

const weather_decoder = JsonDecoder.object<Weather>(
  {
    main: weather_main_decoder,
  },
  'Weather'
);

function useWeather(update_interval: number) {
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState('');
  const [temp, set_temp] = useState(0);

  async function update() {
    console.log('Updating weather');

    try {
      const json = await get<Weather>('/weather.json');
      console.log('Received weather data');
      console.log(json);

      const result = await weather_decoder.decodePromise(json);

      set_temp(result.main.temp);
      set_error('');
    } catch (error) {
      console.log(`Weather error: ${error}`);
      set_error(error.message);
    }

    set_loading(false);
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
