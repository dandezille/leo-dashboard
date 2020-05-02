import React from "react";
import moment from "moment";

interface Props {
  time: moment.Moment;
}

function TimeDisplay(props: Props) {
  return (
    <div
      style={{
        fontSize: "18vmin",
        color: "#edf3ff",
      }}
    >
      {props.time.format("HH:mm")}
    </div>
  );
}

export default TimeDisplay;
