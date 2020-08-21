import { useState } from 'react';
import moment from 'moment';

import { useInterval } from './support/Interval';
import { parse_time } from './support/Time';
import { get } from './support/HTTP';

export type ActivitiesData = {
  [time: string]: string;
};

export interface Activity {
  start: moment.Moment;
  symbol: string;
}

function transform(data: ActivitiesData): Array<Activity> {
  const activities = new Array<Activity>();
  Object.entries(data).forEach(([key, value]) => {
    activities.push({ start: parse_time(key), symbol: value });
  });

  return activities;
}

function sort(activities: Array<Activity>): Array<Activity> {
  return activities.sort((first, second) => {
    return first.start.diff(second.start);
  });
}

export function useActivities(update_interval: number) {
  const [activities, set_activities] = useState<ActivitiesData>({
    '9:00': '',
    '10:00': '',
  });

  async function update() {
    console.log('Updating activities');
    try {
      const data = await get<ActivitiesData>('/activities.json');
      set_activities(data);
    } catch (error) {
      console.log(`Activities error: ${error.message}`);
    }
  }

  useInterval(update, update_interval);
  return activities;
}

export function find_activities(
  activities: ActivitiesData,
  time: moment.Moment
): [Activity, Activity] {
  const factory = new ActivitiesFactory(activities);
  const [current, next] = factory.find(time);
  return [current, next];
}

class ActivitiesFactory {
  private activities: { [time: string]: string };
  private activity_times: string[];

  constructor(activities: { [time: string]: string }) {
    this.activities = activities;
    this.activity_times = Object.keys(this.activities);
  }

  find(time: moment.Moment) {
    const current_index = this.activity_index_at(time);
    const next_index = this.next_index(current_index);

    const current = {
      start: parse_time(this.activity_times[current_index]),
      symbol: this.activities[this.activity_times[current_index]],
    };

    const next = {
      start: parse_time(this.activity_times[next_index]),
      symbol: this.activities[this.activity_times[next_index]],
    };

    return [current, next];
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
}
