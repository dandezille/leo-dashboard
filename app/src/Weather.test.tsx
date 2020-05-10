import React from "react";
import { render, act } from "@testing-library/react";

import Weather from "./Weather";
import { create_test_weather_provider, WeatherData } from "./WeatherProvider";

it("renders successfully", async () => {
  const data: WeatherData = {
    temp: 20,
  };

  await act(async () => {
    render(
      <Weather
        weather_provider={create_test_weather_provider(data)}
        update_interval={5 * 1000}
      />
    );
  });
});
