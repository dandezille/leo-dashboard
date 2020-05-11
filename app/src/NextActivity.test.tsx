import React from "react";
import { render } from "@testing-library/react";
import NextActivity from "./NextActivity";

it("renders successfully", () => {
  render(<NextActivity activity="?" />);
});
