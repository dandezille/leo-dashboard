import { useState } from 'react';
import moment from 'moment';
import { JsonDecoder } from 'ts.data.json';

import { useInterval } from './support/Interval';
import { parse_time } from './support/Time';
import { get } from './support/HTTP';
import { ActivitiesData, ActivitiesDataElement, Activity } from './models';

const activity_decoder = JsonDecoder.object<ActivitiesDataElement>(
  {
    start: JsonDecoder.string,
    symbol: JsonDecoder.string
  }, 'Activity');

const activities_decoder = JsonDecoder.array<ActivitiesDataElement>(activity_decoder, 'Activity[]');

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
  const [activities, set_activities] = useState<ActivitiesData>([
    { start: '9:00', symbol: '' },
    { start: '10:00', symbol: '' },
  ]);

  async function update() {
    console.log('Updating activities');
    try {
      const json = await get<ActivitiesData>('/activities.json');
      console.log('Received activities data');
      console.log(json);

      const result = await activities_decoder.decodePromise(json);

      set_activities(result);
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
  const transformed = transform(activities);
  const sorted = sort(transformed);

  const find_result = sorted.findIndex((a) => a.start > time);
  const next_index = find_result == -1 ? 0 : find_result;
  const current_index = mod(next_index - 1, sorted.length);

  return [sorted[current_index], sorted[next_index]];
}
