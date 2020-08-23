import React from 'react';
import moment from 'moment';

import { Activity } from './models';
import ProgressRing from './ProgressRing';
import { time_diff } from './support/Time';

interface Props {
  activity: Activity;
  next: Activity;
  time: moment.Moment;
}

export default function ActivityDisplay(props: Props) {
  const elapsed = props.time.diff(props.activity.start);
  const duration = time_diff(props.activity.start, props.next.start);
  const progress = elapsed / duration;
  const remaining = moment
    .duration(props.activity.start.add(duration).diff(props.time))
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
          {props.activity.symbol}
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
