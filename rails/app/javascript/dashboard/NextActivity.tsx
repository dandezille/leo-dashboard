import React from "react";

interface Props {
  activity: string;
}

export default function NextActivity(props: Props) {
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
