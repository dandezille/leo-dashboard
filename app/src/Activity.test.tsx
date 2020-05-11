import React from "react";
import ReactDOM from "react-dom";
import Activity from "./Activity";

it("renders successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Activity activity="?" progress={0.5} />, div);
});
