import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { get_activities } from './Activities';
import { get_open_weather_map_data } from './Weather';

export function render_dashboard(container:Element) {
  ReactDOM.render(
    <React.StrictMode>
      <App
        get_activities={get_activities}
        get_weather={get_open_weather_map_data}
      />
    </React.StrictMode>,
    container
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('dashboard');
  if (!target) return;
  render_dashboard(target);
});
