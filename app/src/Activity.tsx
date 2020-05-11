import React from "react";

import { Activity as ActivityInterface } from "./Activities";
import ProgressRing from "./ProgressRing";
import moment from "moment";

interface Props {
  activity: ActivityInterface;
  time: moment.Moment;
}

export default function Activity(props: Props) {
  const elapsed = props.time.diff(props.activity.start);
  const progress = elapsed / props.activity.duration;
  const remaining = moment
    .duration(
      props.activity.start.add(props.activity.duration).diff(props.time)
    )
    .humanize();

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
        <ProgressRing radius={0.94} progress={progress} />
        <text
          fill="#edf3ff"
          fontSize="1.1"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {props.activity.symbol}
        </text>
      </svg>
      <div
        style={{
          color: "white",
          position: "absolute",
          bottom: "110px",
          fontSize: "1.5em",
        }}
      >
        {remaining}
      </div>
    </div>
  );
}
