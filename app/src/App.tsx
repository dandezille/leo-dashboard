import React, { useState, useEffect } from "react";
import moment from "moment";

import Activities from "./Activities";
import ActivityDisplay from "./ActivityDisplay";
import NextActivityDisplay from "./NextActivityDisplay";
import TimeDisplay from "./TimeDisplay";
import Weather from "./Weather";
import { create_open_weather_map_provider } from "./WeatherProvider";

interface Props {
  activities: Activities;
}

interface State {
  time: moment.Moment;
}

export default function App(props: Props) {
  const [time, set_time] = useState(moment());

  useEffect(() => {
    const id = setInterval(() => set_time(moment()));
    return () => clearInterval(id);
  }, []);

  const activity = props.activities.current(time);
  const next_activity = props.activities.next(time);
  const elapsed = time.diff(activity.start);
  const progress = elapsed / activity.duration;

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <ActivityDisplay activity={activity.symbol} progress={progress} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "15px",
        }}
      >
        <TimeDisplay time={time} />
        <Weather
          weather_provider={create_open_weather_map_provider()}
          update_interval={5 * 60 * 1000}
        />
        <NextActivityDisplay activity={next_activity.symbol} />
      </div>
    </div>
  );
}
