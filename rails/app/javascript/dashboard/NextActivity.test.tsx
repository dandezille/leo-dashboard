import React from 'react';
import { render, screen } from '@testing-library/react';

import NextActivity from './NextActivity';

it('renders successfully', () => {
  render(<NextActivity activity="?" />);
  expect(screen.getByText('?')).toBeInTheDocument();
});
