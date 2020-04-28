import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";

import App from "./App";

it("renders successfully", () => {
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

  const { getByText } = render(<App activities={activities_mock} />);
});
