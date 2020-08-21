import { useState } from 'react';
import moment from 'moment';

import { useInterval } from './support/Interval';
import { parse_time } from './support/Time';
import { get } from './support/HTTP';

type ActivitiesData = {
  [time: string]: string;
};

export type Activity = { time: moment.Moment; symbol: string };

function transform_and_sort(data: ActivitiesData): Activity[] {
  const activities = new Array<Activity>();
  Object.entries(data).forEach(([key, value]) => {
    activities.push({ time: parse_time(key), symbol: value });
  });

  return activities.sort((first, second) => {
    return first.time.diff(second.time);
  });
}

export function useActivities(update_interval: number) {
  const [activities, set_activities] = useState<Activity[]>(
    new Array<Activity>()
  );

  async function update() {
    console.log('Updating activities');

    try {
      const data = await get<ActivitiesData>('/activities.json');
      console.log(`Activities update successful ${JSON.stringify(data)}`);

      const activities = transform_and_sort(data);
      set_activities(activities);
    } catch (error) {
      console.log(`Activities error: ${error.message}`);
    }
  }

  useInterval(update, update_interval);
  return activities;
}
