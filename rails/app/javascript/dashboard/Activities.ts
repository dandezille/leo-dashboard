import { useState } from 'react';
import moment from 'moment';

import { useInterval } from './support/Interval';
import { parse_time, time_diff } from './support/Time';
import { get } from './support/HTTP';

type ActivitiesData = {
  [time: string]: string;
};

export interface Activity {
  time: moment.Moment;
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
      time: moment(),
      symbol: '',
    };
  }

  next(time: moment.Moment) {
    return {
      time: moment(),
      symbol: '',
    };
  }
}

export function useActivities(
  get_activities: GetActivities,
  update_interval: number
) {
  const [activities, set_activities] = useState<Activities>(
    new NullActivities()
  );

  function update() {
    get_activities()
      .then((result) => {
        set_activities(result);
      })
      .catch((error: Error) => {
        console.log(`Activities error: ${error.message}`);
      });
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
      time: current_start,
      symbol: this.activities[this.activity_times[current_index]],
    };
  }

  next(time: moment.Moment) {
    const current_index = this.next_index(this.activity_index_at(time));
    const current_start = parse_time(this.activity_times[current_index]);

    return {
      time: current_start,
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
}

export function create_activities(activities: ActivitiesData): Activities {
  return new ActivitiesImplementation(activities);
}

export async function get_activities() {
  console.log('Updating activities');
  const data = await get<ActivitiesData>('/activities.json');
  return create_activities(data);
}

export default Activities;
