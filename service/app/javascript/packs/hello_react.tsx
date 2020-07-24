// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import App from "./App";

import { create_activities } from "./Activities";
import { create_open_weather_map_provider } from "./WeatherProvider";

const activities = create_activities();
const provider = create_open_weather_map_provider();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App activities={activities} weather_provider={provider} />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
})
