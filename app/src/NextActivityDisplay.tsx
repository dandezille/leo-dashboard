import React from "react";

interface Props {
  activity: string;
}

function NextActivityDisplay(props: Props) {
  return (
    <div
      style={{
        fontSize: "18vmin",
        color: "#edf3ff",
      }}
    >
      {props.activity}
    </div>
  );
}

export default NextActivityDisplay;
