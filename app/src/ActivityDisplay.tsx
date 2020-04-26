import React from "react";
import moment from "moment";

import ProgressRing from "./ProgressRing";

const activities: { [time: string]: string } = {
  "07:30": "🥐", // breakfast
  "08:15": "🦷", // Teeth and face wash
  "08:20": "📚", // French story and drawing
  "08:30": "🎨", // Craft (colouring, painting, drawing)
  "09:00": "🍳", // Baking
  "09:30": "️🚶‍♂️", // Walk
  "10:00": "️☕", // Coffee and listen
  "10:30": "️🧩", // Play
  "12:00": "️📺", // Cartoon
  "12:30": "️🍽️", // Lunch and listen
  "13:00": "️️️📺", // Cartoon
  "13:30": "️️️🧩️", // Play
  "13:50": "️️️📖️", // Story
  "14:00": "️️️️🛏️", // Nap
  "16:30": "️️️🧩️", // Play
  "17:00": "️🚶‍♂️", // Walk
  "17:30": "️️️📺", // Cartoon
  "18:00": "️🍽️", // Dinner and listen
  "18:30": "️️️📺", // Cartoon
  "19:00": "️️️🛀", // Bath or shower
  "19:30": "️️️📖️", // Story
  "19:40": "🦷", // Teeth and face wash
  "19:45": "🛏️", // Bed
};

function parseTime(time: string) {
  return moment(time, "HH:mm");
}

function nextTimeIndex(times: any[], current_time: moment.Moment) {
  const index = times.findIndex((k) => parseTime(k) > current_time);
  if (index !== -1) {
    return index;
  }

  return times.length; // Handle last activity
}

interface Props {
  time: moment.Moment;
}

function ActivityDisplay(props: Props) {
  const activity_times = Object.keys(activities);
  const next_activity = nextTimeIndex(activity_times, props.time);
  const current_activity = activities[activity_times[next_activity - 1]];

  const current_activity_start = parseTime(activity_times[next_activity - 1]);
  const next_activity_start = parseTime(activity_times[next_activity]);

  const activity_duration = next_activity_start.diff(current_activity_start);
  const activity_elapsed = props.time.diff(current_activity_start);
  const progress = activity_elapsed / activity_duration;

  return (
    <div
      style={{
        position: "relative",
        color: "#edf3ff",
        textAlign: "center",
      }}
    >
      <svg viewBox="-1 -1 2 2" height="95vh" width="95vh">
        <ProgressRing radius={0.94} progress={progress} />
        <text fontSize="1.1" textAnchor="middle" dominantBaseline="middle">
          {current_activity}
        </text>
      </svg>
    </div>
  );
}

export default ActivityDisplay;
