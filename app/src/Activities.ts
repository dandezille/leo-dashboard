import moment from "moment";

function parse_time(time: string) {
  return moment(time, "HH:mm");
}

function time_diff(current: moment.Moment, next: moment.Moment) {
  if (next > current) {
    return next.diff(current);
  }

  return next.add(1, "day").diff(current);
}

interface Activity {
  start: moment.Moment;
  duration: number;
  symbol: string;
}

interface Activities {
  current(time: moment.Moment): Activity;
  next(time: moment.Moment): Activity;
}

class ActivitiesImplementation implements Activities {
  private activities: { [time: string]: string };
  private activity_times: string[];

  constructor(activities: { [time: string]: string }) {
    this.activities = activities;
    this.activity_times = Object.keys(this.activities);
  }

  current(time: moment.Moment) {
    const current_index = this.activity_index_at(time);
    const current_start = parse_time(this.activity_times[current_index]);

    return {
      start: current_start,
      duration: this.activity_duration(current_index),
      symbol: this.activities[this.activity_times[current_index]],
    };
  }

  next(time: moment.Moment) {
    const current_index = this.next_index(this.activity_index_at(time));
    const current_start = parse_time(this.activity_times[current_index]);

    return {
      start: current_start,
      duration: this.activity_duration(current_index),
      symbol: this.activities[this.activity_times[current_index]],
    };
  }

  private activity_index_at(time: moment.Moment) {
    const times = this.activity_times.map((t) => moment(t, "HH:mm"));

    for (var i = 0; i < times.length - 1; i++) {
      if (times[i] <= time && times[i + 1] > time) {
        return i;
      }
    }

    return times.length - 1;
  }

  private next_index(index: number): number {
    return (index + 1) % this.activity_times.length;
  }

  private activity_duration(current_index: number): number {
    const next_index = this.next_index(current_index);

    const current_start = parse_time(this.activity_times[current_index]);
    const next_start = parse_time(this.activity_times[next_index]);

    return time_diff(current_start, next_start);
  }
}

const default_activities = {
  "07:30": "🥐", // breakfast
  "08:30": "🦷", // Teeth and face wash
  "08:35": "📚", // French story and drawing
  "08:45": "🎨", // Craft (colouring, painting, drawing)
  "09:00": "🍳", // Baking
  "09:30": "️🚶‍♂️", // Walk
  "10:00": "️☕", // Coffee and listen
  "10:30": "️🧩", // Play
  "11:50": "️️️📖️", // Story
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
  "19:30": "🦷", // Teeth and face wash
  "19:40": "️️️📖️", // Story
  "19:45": "🛏️", // Bed
};

export function create_activities(
  activities: { [time: string]: string } = default_activities
): Activities {
  return new ActivitiesImplementation(activities);
}

export default Activities;
