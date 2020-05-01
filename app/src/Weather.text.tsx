import React from "react";
import { render } from "@testing-library/react";
import Weather from "./Weather";
import moment from "moment";

it("renders successfully", () => {
  const { getByText } = render(<Weather />);
});
