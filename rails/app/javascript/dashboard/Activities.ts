import moment from 'moment';

function parse_time(time: string) {
  return moment(time, 'HH:mm');
}

function time_diff(current: moment.Moment, next: moment.Moment) {
  if (next > current) {
    return next.diff(current);
  }

  return next.add(1, 'day').diff(current);
}

export interface Activity {
  start: moment.Moment;
  duration: number;
  symbol: string;
}

export interface Activities {
  current: Activity;
  next: Activity;
}

class ActivitiesFactory {
  private activities: { [time: string]: string };
  private activity_times: string[];

  constructor(activities: { [time: string]: string }) {
    this.activities = activities;
    this.activity_times = Object.keys(this.activities);
  }

  create(time: moment.Moment): Activities {
    const current_index = this.activity_index_at(time);
    const next_index = this.next_index(current_index);

    return {
      current: {
        start: parse_time(this.activity_times[current_index]),
        duration: this.activity_duration(current_index),
        symbol: this.activities[this.activity_times[current_index]],
      },
      next: {
        start: parse_time(this.activity_times[next_index]),
        duration: this.activity_duration(next_index),
        symbol: this.activities[this.activity_times[next_index]],
      },
    };
  }

  private activity_index_at(time: moment.Moment) {
    const times = this.activity_times.map((t) => moment(t, 'HH:mm'));

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

export type ActivitiesData = null | { [time: string]: string };

export function create_activities(
  activities: ActivitiesData,
  time: moment.Moment
): Activities {
  if (!activities) {
    return {
      current: {
        start: moment(),
        duration: 60,
        symbol: '',
      },
      next: {
        start: moment(),
        duration: 60,
        symbol: '',
      },
    };
  }

  const factory = new ActivitiesFactory(activities);
  return factory.create(time);
}

export default Activities;
