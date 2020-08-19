import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import App from './App';

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

  ReactDOM.render(
    <App
      get_activities={() => {
        return Promise.resolve(activities_mock);
      }}
    />,
    document.createElement('div')
  );
});
