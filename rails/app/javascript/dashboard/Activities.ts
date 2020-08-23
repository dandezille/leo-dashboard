import { useState } from 'react';
import moment from 'moment';
import Ajv from 'ajv';

import { useInterval } from './support/Interval';
import { parse_time } from './support/Time';
import { get } from './support/HTTP';
import { ActivitiesData, Activity } from './models';

const validate_activities_data = new Ajv().compile({
  type: 'object',
  patternProperties: {
    '^[0-9]{1,2}:[0-9]{1,2}$': { type: 'string' },
  },
  additionalProperties: false,
});

function isActivitiesData(data: any): data is ActivitiesData {
  const valid = validate_activities_data(data);
  if (!valid) console.log(validate_activities_data.errors);
  if (typeof valid !== 'boolean') throw Error('Async schema');
  return valid;
}
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function transform(data: ActivitiesData): Array<Activity> {
  return Object.entries(data).map(([key, value]) => {
    return { start: parse_time(key), symbol: value };
  });
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
      console.log('Received activities data');
      console.log(data);

      if (!isActivitiesData(data)) {
        throw Error('Invalid activities data');
      }

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
  const transformed = transform(activities);
  const sorted = sort(transformed);

  const find_result = sorted.findIndex((a) => a.start > time);
  const next_index = find_result == -1 ? 0 : find_result;
  const current_index = mod(next_index - 1, sorted.length);

  return [sorted[current_index], sorted[next_index]];
}
