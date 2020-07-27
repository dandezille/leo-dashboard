import React from "react";

interface Props {
  radius: number;
  progress: number;
}

function ProgressRing(props: Props) {
  const circumference = props.radius * 2 * Math.PI;
  const offset = circumference - props.progress * circumference;
  return (
    <circle
      className="progress-ring__circle"
      style={{
        transition: "stroke-dashoffset 0.35s",
        transform: "rotate(-90deg)",
      }}
      stroke="white"
      strokeWidth={1 - props.radius}
      strokeDasharray={circumference + " " + circumference}
      strokeDashoffset={offset}
      fill="transparent"
      r={props.radius}
      cx="0"
      cy="0"
    />
  );
}

export default ProgressRing;
