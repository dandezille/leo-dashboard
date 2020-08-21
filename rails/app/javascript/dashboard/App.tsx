import React from 'react';

import ActivityDisplay from './Activity';
import NextActivity from './NextActivity';
import TimeDisplay from './Time';

import { useTime } from './support/Time';
import { useInterval } from './support/Interval';
import { useActivities, Activity } from './Activities';
import Weather from './Weather';

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function find_activities(activities: Activity[], time: moment.Moment) {
  const find_result = activities.findIndex((e) => e.time > time);
  const next = find_result == -1 ? 0 : find_result;
  const current = mod(next - 1, activities.length);

  return [activities[current], activities[next]];
}

export default function App() {
  const time = useTime();
  const activities = useActivities(10 * 1000);

  const [current, next] = find_activities(activities, time);

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
      <ActivityDisplay
        current_activity={current}
        next_activity={next}
        time={time}
      />
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
        <NextActivity activity={next.symbol} />
      </div>
    </div>
  );
}
