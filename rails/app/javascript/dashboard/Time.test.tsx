import React from 'react';
import { render, screen } from '@testing-library/react';
import Time from './Time';
import moment from 'moment';

it('renders successfully', () => {
  const time = moment('13:24', 'HH:mm');
  render(<Time time={time} />);
  expect(screen.getByText('13:24')).toBeInTheDocument();
});
