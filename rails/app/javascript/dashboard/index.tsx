import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { create_activities } from './Activities';
import { get_open_weather_map_data } from './Weather';

async function get_activities() {
  return create_activities({
    '08:00': '⏰', // wake up
    '08:15': '🥐', // breakfast
    '08:45': '🦷', // Teeth and face wash
    '09:00': '🇫🇷', // French story and drawing
    '09:15': '️🚶', // Walk
    '10:00': '️☕', // Coffee and listen
    '10:30': '️🧩', // Play
    '11:45': '️📺', // Cartoon
    '12:15': '️🍽️', // Lunch and listen
    '13:15': '️️️📖️', // Story
    '13:30': '️️️️🛏️', // Np
    '15:00': '️️️📖️', // Story
    '15:15': '️️️🧩️', // Play
    '16:30': '️🚶', // Walk
    '17:00': '️️️🧩️', // Play
    '18:00': '️️️📺', // Cartoon
    '18:30': '️🍽️', // Dinner and listen
    '19:15': '️️️🛀', // Bath or shower
    '19:45': '🦷', // Teeth and face wash
    '20:00': '🛏️', // Bed
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        get_activities={get_activities}
        get_weather={get_open_weather_map_data}
      />
    </React.StrictMode>,
    document.getElementById('dashboard')
  );
});
