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
        lineHeight: "120px",
      }}
    >
      {props.activity}
    </div>
  );
}

export default NextActivityDisplay;
