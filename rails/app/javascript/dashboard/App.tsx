import React, { useState, useEffect } from 'react';

import ActivityDisplay from './Activity';
import NextActivity from './NextActivity';
import TimeDisplay from './Time';

import { useTime } from './support/Time';
import Activities, { GetActivities, NullActivities } from './Activities';
import Weather, { GetWeather } from './Weather';

interface Props {
  activities: Activities;
  get_weather: GetWeather;
}

function useActivities(get_activities: GetActivities) {
  const [activities, set_activities] = useState<Activities>(
    new NullActivities()
  );

  function update(get_activities: GetActivities) {
    get_activities().then((result) => {
      set_activities(result);
    });
  }

  useEffect(() => {
    update(get_activities);
  }, [get_activities]);

  return activities;
}

export default function App(props: Props) {
  const time = useTime();
  const activities = useActivities(() => {
    return Promise.resolve(props.activities);
  });

  const current_activity = activities.current(time);
  const next_activity = activities.next(time);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        minHeight: '100vh',
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
          <Weather
            get_weather={props.get_weather}
            update_interval={5 * 60 * 1000}
          />
        </div>
        <NextActivity activity={next_activity.symbol} />
      </div>
    </div>
  );
}
