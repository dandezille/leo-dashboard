import { useState } from 'react';
import moment from 'moment';

import { useInterval } from './Interval';

export function useTime() {
  const [time, set_time] = useState(moment());
  useInterval(() => {
    set_time(moment());
  }, 1000);
  return time;
}

export function parse_time(time: string) {
  return moment(time, 'HH:mm');
}

export function time_diff(current: moment.Moment, next: moment.Moment) {
  if (next > current) {
    return next.diff(current);
  }

  return next.add(1, 'day').diff(current);
}
