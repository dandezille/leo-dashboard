import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { get } from './support/HTTP';
import { Weather, WeatherMain } from './models';

const weather_decoder = JsonDecoder.object<Weather>(
  {
    main: JsonDecoder.object<WeatherMain>(
      {
        temp: JsonDecoder.number,
        temp_min: JsonDecoder.number,
        temp_max: JsonDecoder.number,
      },
      'WeatherMain'
    ),
  },
  'Weather'
);

function useWeather(update_interval: number) {
  const [weather, set_weather] = useState<null | Weather>();
  const [error, set_error] = useState<null | Error>();

  async function update() {
    console.log('Updating weather');

    try {
      const data = await get('/weather.json');
      console.log('Received weather data');
      console.log(data);

      const result = await weather_decoder.decodePromise(data);

      set_weather(result);
      set_error(null);
    } catch (error) {
      console.log(`Weather error: ${error}`);
      set_error(error);
    }
  }

  useInterval(update, update_interval);
  return { weather, error };
}

interface Props {
  update_interval: number;
}

export default function WeatherDisplay(props: Props) {
  const { weather, error } = useWeather(props.update_interval);

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error.message}</div>;
  }

  if (!weather) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  return (
    <div
      style={{
        color: 'white',
        fontSize: '8vmin',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'grey',
      }}
    >
      <div>{(+weather.main.temp_min).toFixed(0)}</div>
      <div style={{ fontSize: '12vmin', padding: '0px 8px', color: 'white' }}>
        {(+weather.main.temp).toFixed(0)}
      </div>
      <div>{(+weather.main.temp_max).toFixed(0)}</div>
      <div style={{ paddingLeft: '10px' }}>°C</div>
    </div>
  );
}
