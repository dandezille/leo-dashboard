import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import { create_test_weather_provider } from "../models/WeatherProvider";

import App from "./App";

it("renders successfully", async () => {
  const activities_mock = {
    current: jest.fn().mockReturnValue({
      start: moment().subtract(30, "minutes"),
      duration: 60,
      symbol: "current",
    }),
    next: jest.fn().mockReturnValue({
      start: moment().add(30, "minutes"),
      duration: 60,
      symbol: "next",
    }),
  };

  const div = document.createElement("div");
  ReactDOM.render(
    <App
      activities={activities_mock}
      weather_provider={create_test_weather_provider({
        temp: 20,
      })}
    />,
    div
  );
});
