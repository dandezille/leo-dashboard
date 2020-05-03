import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { create_activities } from "./Activities";
import { create_open_weather_map_provider } from "./WeatherProvider";

const activities = create_activities();
const provider = create_open_weather_map_provider();

ReactDOM.render(
  <React.StrictMode>
    <App activities={activities} weather_provider={provider} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
