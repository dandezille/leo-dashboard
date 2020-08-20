import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import App from './App';

describe('App', () => {
  it('renders successfully', async () => {
    const activities_mock = {
      current: jest.fn().mockReturnValue({
        start: moment().subtract(30, 'minutes'),
        duration: 60,
        symbol: 'current',
      }),
      next: jest.fn().mockReturnValue({
        start: moment().add(30, 'minutes'),
        duration: 60,
        symbol: 'next',
      }),
    };

    render(
      <App
        get_activities={() => {
          return Promise.resolve(activities_mock);
        }}
      />
    );

    expect(await screen.findByText('current')).toBeInTheDocument();
  });
});
