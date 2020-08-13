import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { create_activities } from './Activities';
import { create_open_weather_map_provider } from './WeatherProvider';

const activities = create_activities();
const provider = create_open_weather_map_provider();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App activities={activities} weather_provider={provider} />
    </React.StrictMode>,
    document.getElementById('dashboard')
  );
});
