import React from 'react';

import ActivityDisplay from './Activity';
import NextActivity from './NextActivity';
import TimeDisplay from './Time';
import Weather from './Weather';

import { useTime } from './support/Time';
import { useActivities, find_activities } from './Activities';

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
      <ActivityDisplay activity={current} next={next} time={time} />
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
