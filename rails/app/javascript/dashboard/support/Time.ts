import { useState, useEffect } from 'react';
import moment from 'moment';

export function useTime() {
  const [time, set_time] = useState(moment());

  useEffect(() => {
    const id = setInterval(() => {
      set_time(moment());
    }, 1000);
    return () => clearInterval(id);
  });

  return time;
}
