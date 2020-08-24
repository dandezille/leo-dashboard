import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { get } from './support/HTTP';
import { Result, tryCatch, isError } from './support/result';
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

function useWeather(update_interval: number) {
  const [weather, set_weather] = useState<null | Result<Weather>>();

  async function update() {
    set_weather(
      await tryCatch(async () => {
        console.log('Updating weather');
        const data = await get('/weather.json');
        console.log('Received weather data');
        console.log(data);

        return await weather_decoder.decodePromise(data);
      })
    );
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

  if (isError(weather)) {
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
