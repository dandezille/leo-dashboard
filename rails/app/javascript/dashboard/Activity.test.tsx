import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';

import Activity from './Activity';

it('renders successfully', () => {
  render(
    <Activity
      activity={{
        start: moment().subtract(5, 'minutes'),
        duration: moment.duration(1, 'hour').asMilliseconds(),
        symbol: '?',
      }}
      time={moment()}
    />
  );
});
