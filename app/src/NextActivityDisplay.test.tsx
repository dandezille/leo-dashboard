import React from "react";
import { render } from "@testing-library/react";
import NextActivityDisplay from "./NextActivityDisplay";

it("renders successfully", () => {
  const { getByText } = render(<NextActivityDisplay activity="?" />);
});
