import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';

import { useInterval } from './support/Interval';
import { get } from './support/HTTP';

interface WeatherData {
  main: {
    temp: number;
  };
}

const validate_weather_data = new Ajv().compile({
  type: 'object',
  properties: {
    main: {
      type: 'object',
      properties: {
        temp: { type: 'number' },
      },
      required: ['temp'],
    },
  },
  required: ['main'],
});

function isWeatherData(data: any): data is WeatherData {
  const valid = validate_weather_data(data);
  if (!valid) console.log(validate_weather_data.errors);
  if (typeof valid !== 'boolean') throw Error('Async schema');
  return valid;
}

function useWeather(update_interval: number) {
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState('');
  const [temp, set_temp] = useState(0);

  async function update() {
    console.log('Updating weather');

    try {
      const data = await get<WeatherData>('/weather.json');
      console.log('Received weather data');
      console.log(data);

      if (!isWeatherData(data)) {
        throw Error('Invalid weather data');
      }

      set_temp(data.main.temp);
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
