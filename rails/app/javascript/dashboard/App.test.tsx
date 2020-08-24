import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import App from './App';

describe('App', () => {
  it('renders successfully', async () => {
    render(<App />);

    expect(await screen.findByText('current')).toBeInTheDocument();
    expect(await screen.findByText('20')).toBeInTheDocument();
  });
});
