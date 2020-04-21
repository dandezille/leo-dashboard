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

function nextTimeIndex(times, current_time) {
  const index = times.findIndex((k) => moment(k, "HH:mm") > current_time);
  if (index != -1) {
    return index;
  }

  return times.length; // Handle last activity
  }

function ActivityDisplay(props) {
  const activity_times = Object.keys(activities);
  const next_activity = nextTimeIndex(activity_times, props.time);
  const current_activity = activities[activity_times[next_activity - 1]];
  return <div style={{ fontSize: "50vmin" }}>{current_activity}</div>;
}
