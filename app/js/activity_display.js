"use strict";

const activities = {
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
