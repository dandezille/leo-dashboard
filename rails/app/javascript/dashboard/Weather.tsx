import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { get } from './support/HTTP';
import { Weather } from './models';

const weather_decoder = JsonDecoder.object<Weather>(
  {
    main: JsonDecoder.object<{ temp: number }>(
      {
        temp: JsonDecoder.number,
      },
      'WeatherMain'
    ),
  },
  'Weather'
);

type Result<T> = T | Error;

function tryCatch<T>(action: () => T): Result<T> {
  try {
    return action();
  } catch (error) {
    return error;
  }
}

function useWeather(update_interval: number) {
  const [weather, set_weather] = useState<null | Result<Weather>>();

  async function update() {
    console.log('Updating weather');

    var result = await tryCatch(async () => {
      const data = await get('/weather.json');
      console.log('Received weather data');
      console.log(data);

      return await weather_decoder.decodePromise(data);
    });

    set_weather(result);
  }

  useInterval(update, update_interval);
  return { weather };
}

interface Props {
  update_interval: number;
}

export default function WeatherDisplay(props: Props) {
  const { weather } = useWeather(props.update_interval);

  if (weather == null) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (weather instanceof Error) {
    return <div style={{ color: 'white' }}>Error: {weather.message}</div>;
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
      {(+weather.main.temp).toFixed(0)} °C
    </div>
  );
}
