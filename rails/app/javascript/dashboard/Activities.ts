import { useState } from 'react';
import moment from 'moment';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { parse_time } from './support/Time';
import { get } from './support/HTTP';
import { Result, tryCatch } from './support/result';
import { ActivitiesData, Activity } from './models';

const activities_decoder = JsonDecoder.array<{ start: string; symbol: string }>(
  JsonDecoder.object<{ start: string; symbol: string }>(
    {
      start: JsonDecoder.string,
      symbol: JsonDecoder.string,
    },
    'Activity'
  ),
  'Activity[]'
);

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function transform(data: ActivitiesData): Array<Activity> {
  return data.map((entry) => {
    return { start: parse_time(entry.start), symbol: entry.symbol };
  });
}

function sort(activities: Array<Activity>): Array<Activity> {
  return activities.sort((first, second) => {
    return first.start.diff(second.start);
  });
}

export function useActivities(update_interval: number) {
  const [activities, set_activities] = useState<Result<ActivitiesData>>([
    { start: '9:00', symbol: '' },
    { start: '10:00', symbol: '' },
  ]);

  async function update() {
    set_activities(
      await tryCatch(async () => {
        console.log('Updating activities');
        const data = await get('/activities.json');
        console.log('Received activities data');
        console.log(data);

        return await activities_decoder.decodePromise(data);
      })
    );
  }

  useInterval(update, update_interval);
  return activities;
}

export function find_activities(
  activities: ActivitiesData,
  time: moment.Moment
): [Activity, Activity] {
  const transformed = transform(activities);
  const sorted = sort(transformed);

  const find_result = sorted.findIndex((a) => a.start > time);
  const next_index = find_result == -1 ? 0 : find_result;
  const current_index = mod(next_index - 1, sorted.length);

  return [sorted[current_index], sorted[next_index]];
}
