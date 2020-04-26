import moment from "moment";

interface Activity {
  start: moment.Moment;
  duration: number;
  symbol: string;
}

interface Activities {
  current(time: moment.Moment): Activity;
}

class ActivitiesImplementation implements Activities {
  constructor(activities: { [time: string]: string }) {
    this.activities = activities;
  }

  current(time: moment.Moment) {
    const activity_times = Object.keys(this.activities);
    const next_activity = this.nextTimeIndex(activity_times, time);
    const current_activity = this.activities[activity_times[next_activity - 1]];

    const current_activity_start = this.parseTime(
      activity_times[next_activity - 1]
    );
    const next_activity_start = this.parseTime(activity_times[next_activity]);

    const activity_duration = next_activity_start.diff(current_activity_start);

    return {
      start: current_activity_start,
      duration: activity_duration,
      symbol: current_activity,
    };
  }

  private activities: { [time: string]: string };

  private parseTime(time: string) {
    return moment(time, "HH:mm");
  }

  private nextTimeIndex(times: any[], current_time: moment.Moment) {
    const index = times.findIndex((k) => this.parseTime(k) > current_time);
    if (index !== -1) {
      return index;
    }

    return times.length; // Handle last activity
  }
}

const default_activities = {
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
  "19:30": "🦷", // Teeth and face wash
  "19:40": "️️️📖️", // Story
  "19:45": "🛏️", // Bed
};

export function create_activities(
  activities: { [time: string]: string } = default_activities
) {
  return new ActivitiesImplementation(activities);
}

export default Activities;
