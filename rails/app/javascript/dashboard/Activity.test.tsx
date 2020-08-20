import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import Activity from './Activity';

it('renders successfully', async () => {
  const current = {
    time: moment().subtract(5, 'minutes'),
    symbol: 'A',
  };

  const next = {
    time: moment().add(5, 'minutes'),
    symbol: 'B',
  };

  render(<Activity current_activity={current} next_activity={next} time={moment()} />);

  expect(await screen.findByText('A')).toBeInTheDocument();
});
