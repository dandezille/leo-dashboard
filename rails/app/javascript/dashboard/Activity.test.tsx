import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Activity from './Activity';

it('renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Activity
      activity={{
        start: moment().subtract(5, 'minutes'),
        duration: moment.duration(1, 'hour').asMilliseconds(),
        symbol: '?',
      }}
      time={moment()}
    />,
    div
  );
});
