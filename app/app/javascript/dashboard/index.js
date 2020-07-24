import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App";

import { create_activities } from "./models/Activities";
import { create_open_weather_map_provider } from "./models/WeatherProvider";

const activities = create_activities();
const provider = create_open_weather_map_provider();

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('dashboard');

  if (element) {
    ReactDOM.render(
      <React.StrictMode>
      <App activities={activities} weather_provider={provider} />
      </React.StrictMode>,

      document.body.appendChild(document.createElement('div')),
    )
  }
});
