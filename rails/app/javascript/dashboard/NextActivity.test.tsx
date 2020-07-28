import React from "react";
import ReactDOM from "react-dom";
import NextActivity from "./NextActivity";

it("renders successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NextActivity activity="?" />, div);
});
