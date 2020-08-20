import React from 'react';
import moment from 'moment';

import { Activity as ActivityInterface } from './Activities';
import ProgressRing from './ProgressRing';
import { time_diff } from './support/Time';

interface Props {
  current_activity: ActivityInterface;
  next_activity: ActivityInterface;
  time: moment.Moment;
}

export default function Activity(props: Props) {
  const elapsed = props.time.diff(props.current_activity.time);
  const duration = time_diff(props.current_activity.time, props.next_activity.time);
  const progress = elapsed / duration;
  const remaining = moment
    .duration(props.current_activity.time.add(duration).diff(props.time))
    .humanize();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg viewBox="-1 -1 2 2" height="95vh" width="95vh">
        <ProgressRing radius={0.94} progress={progress} />
        <text
          fill="#edf3ff"
          fontSize="1.1"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {props.current_activity.symbol}
        </text>
      </svg>
      <div
        style={{
          color: 'white',
          position: 'absolute',
          bottom: '60px',
          fontSize: '1.8em',
        }}
      >
        {remaining}
      </div>
    </div>
  );
}
