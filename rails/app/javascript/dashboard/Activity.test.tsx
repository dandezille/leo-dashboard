import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import Activity from './Activity';

it('renders successfully', async () => {
  const current = {
    start: moment().subtract(5, 'minutes'),
    symbol: 'A',
  };

  const next = {
    start: moment().add(5, 'minutes'),
    symbol: 'B',
  };

  render(<Activity activity={current} next={next} time={moment()} />);

  expect(await screen.findByText('A')).toBeInTheDocument();
});
