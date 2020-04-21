"use strict";

const activities = {
  "07:30": "🥐",
  "08:30": "📖",
  "08:45": "🚗",
  "10:00": "☕️",
  "12:00": "🍽️",
  "13:30": "📖",
  "13:40": "️🛏️",
  "16:30": "🚗",
  "18:00": "🍽️",
  "19:30": "📖",
  "19:40": "😬",
  "19:50": "️🛏️",
};

function ActivityDisplay(props) {
  const keys = Object.keys(activities);

  let current_key = keys.findIndex((k) => moment(k, "HH:mm") > props.time) - 1;
  if (current_key == -2) {
    current_key = keys.length - 1;
  }

  const current_activity = activities[keys[current_key]];

  return <div style={{ fontSize: "50vmin" }}>{current_activity}</div>;
}
