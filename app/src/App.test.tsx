import React from "react";
import { render, act } from "@testing-library/react";
import moment from "moment";

import App from "./App";
import { create_test_weather_provider } from "./WeatherProvider";

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

  await act(async () =>
    render(
      <App
        activities={activities_mock}
        weather_provider={create_test_weather_provider({
          temp: 20,
          feels_like: 18,
        })}
      />
    )
  );
});
