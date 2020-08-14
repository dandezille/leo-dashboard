import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { create_activities } from './Activities';
import { get_open_weather_map_data } from './Weather';

const activities = create_activities();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App activities={activities} get_weather={get_open_weather_map_data} />
    </React.StrictMode>,
    document.getElementById('dashboard')
  );
});
