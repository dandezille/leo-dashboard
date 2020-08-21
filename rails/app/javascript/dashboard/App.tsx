import React from 'react';

import ActivityDisplay from './Activity';
import NextActivity from './NextActivity';
import TimeDisplay from './Time';

import { useTime } from './support/Time';
import { useActivities, create_activities } from './Activities';
import Weather from './Weather';

export default function App() {
  const time = useTime();

  const activities_data = useActivities(10 * 1000);
  const activities = create_activities(activities_data, time);

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
        activity={activities.current}
        next={activities.next}
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
        <NextActivity activity={activities.next.symbol} />
      </div>
    </div>
  );
}
