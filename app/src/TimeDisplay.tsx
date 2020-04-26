import React from "react";
import moment from "moment";

interface Props {
  time: moment.Moment;
}

function TimeDisplay(props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "10px",
        bottom: "10px",
        fontSize: "10vmin",
        color: "#edf3ff",
        textAlign: "center",
      }}
    >
      {props.time.format("HH:mm")}
    </div>
  );
}

export default TimeDisplay;
