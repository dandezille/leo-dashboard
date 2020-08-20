import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import Activity from './Activity';

it('renders successfully', async () => {
  const fake_activity = {
    start: moment().subtract(5, 'minutes'),
    duration: moment.duration(1, 'hour').asMilliseconds(),
    symbol: '?',
  };

  render(<Activity activity={fake_activity} time={moment()} />);

  expect(await screen.findByText('?')).toBeInTheDocument();
});
