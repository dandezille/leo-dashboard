import { useState } from 'react';
import moment from 'moment';

import { get } from './support/HTTP';

import { useInterval } from './support/Interval';

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
  current(time: moment.Moment): Activity;
  next(time: moment.Moment): Activity;
}

export type GetActivities = () => Promise<Activities>;

class NullActivities implements Activities {
  current(time: moment.Moment) {
    return {
      start: moment(),
      duration: 60,
      symbol: '',
    };
  }

  next(time: moment.Moment) {
    return {
      start: moment(),
      duration: 60,
      symbol: '',
    };
  }
}

type ActivitiesData = { [time: string]: string }

export function useActivities(update_interval: number) {
  const [activities, set_activities] = useState<Activities>(
    new NullActivities()
  );

  async function update() {
    console.log('Updating activities');

    try {
      const data = await get<ActivitiesData>('/activities.json');
      const activities = create_activities(data);
      set_activities(activities);
    } catch (error) {
      console.log(`Activities error: ${error.message}`);
    }
  }

  useInterval(update, update_interval);
  return activities;
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

export function create_activities(activities: {
  [time: string]: string;
}): Activities {
  return new ActivitiesImplementation(activities);
}

export default Activities;
