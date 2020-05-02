import React from "react";

interface Props {
  activity: string;
}

function NextActivityDisplay(props: Props) {
  return (
    <div
      style={{
        fontSize: "10vmin",
        color: "#edf3ff",
        textAlign: "center",
      }}
    >
      {props.activity}
    </div>
  );
}

export default NextActivityDisplay;
