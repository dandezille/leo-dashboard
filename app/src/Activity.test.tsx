import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import Activity from "./Activity";

it("renders successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Activity
      activity={{
        start: moment(),
        duration: moment.duration(1, "hour").asMilliseconds(),
        symbol: "?",
      }}
      time={moment().add(5, "minutes")}
    />,
    div
  );
});
