import React from "react";

import ProgressRing from "./ProgressRing";

interface Props {
  progress: number;
  activity: string;
}

export default function Activity(props: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg viewBox="-1 -1 2 2" height="95vh" width="95vh">
        <ProgressRing radius={0.94} progress={props.progress} />
        <text
          fill="#edf3ff"
          fontSize="1.1"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {props.activity}
        </text>
      </svg>
    </div>
  );
}
