import React from 'react';
import { useState } from 'react';

import ActivityDisplay from './Activity';
import NextActivity from './NextActivity';
import TimeDisplay from './Time';
import Weather from './Weather';

import { useTime } from './support/Time';
import { useInterval } from './support/Interval';
import { get } from './support/HTTP';

import { create_activities } from './Activities';

type ActivitiesData = { [time: string]: string };

export function useActivities(update_interval: number) {
  const [activities, set_activities] = useState<ActivitiesData>({
    '00:00': '',
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

export default function App() {
  const time = useTime();
  const activity_data = useActivities(10 * 1000);

  const activities = create_activities(activity_data);
  const current_activity = activities.current(time);
  const next_activity = activities.next(time);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        minHeight: '100vh',
        backgroundColor: '#090a0d',
        fontFamily: "'Rubik', sans-serif",
      }}
    >
      <ActivityDisplay activity={current_activity} time={time} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '15px',
        }}
      >
        <div>
          <TimeDisplay time={time} />
          <Weather update_interval={5 * 60 * 1000} />
        </div>
        <NextActivity activity={next_activity.symbol} />
      </div>
    </div>
  );
}
