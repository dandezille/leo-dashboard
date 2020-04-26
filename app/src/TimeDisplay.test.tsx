import React from "react";
import { render } from "@testing-library/react";
import TimeDisplay from "./TimeDisplay";
import moment from "moment";

it("renders successfully", () => {
  const time = moment();
  const { getByText } = render(<TimeDisplay time={time} />);
  expect(getByText(time.format("HH:mm"))).toBeInTheDocument();
});
