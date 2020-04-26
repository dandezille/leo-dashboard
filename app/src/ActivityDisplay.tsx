import React from "react";

import ProgressRing from "./ProgressRing";

interface Props {
  progress: number;
  current_activity: string;
}

function ActivityDisplay(props: Props) {
  return (
    <div
      style={{
        position: "relative",
        color: "#edf3ff",
        textAlign: "center",
      }}
    >
      <svg viewBox="-1 -1 2 2" height="95vh" width="95vh">
        <ProgressRing radius={0.94} progress={props.progress} />
        <text fontSize="1.1" textAnchor="middle" dominantBaseline="middle">
          {props.current_activity}
        </text>
      </svg>
    </div>
  );
}

export default ActivityDisplay;
