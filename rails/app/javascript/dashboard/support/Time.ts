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
