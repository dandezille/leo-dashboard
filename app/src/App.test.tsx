import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";

import App from "./App";

it("renders successfully", () => {
  const activity = {
    start: moment().subtract(30, "minutes"),
    duration: 60,
    symbol: "?",
  };

  const activities_mock = {
    current: jest.fn().mockReturnValue(activity),
  };

  const { getByText } = render(<App activities={activities_mock} />);
});
