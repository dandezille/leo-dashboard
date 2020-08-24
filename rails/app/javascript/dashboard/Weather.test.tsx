import React from 'react';
import { render, screen } from '@testing-library/react';

import Weather from './Weather';

it('renders successfully', async () => {
  render(<Weather update_interval={5 * 1000} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('20')).toBeInTheDocument();
  expect(await screen.findByText('18')).toBeInTheDocument();
  expect(await screen.findByText('22')).toBeInTheDocument();
});
