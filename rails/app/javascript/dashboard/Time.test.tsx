import React from 'react';
import ReactDOM from 'react-dom';
import Time from './Time';
import moment from 'moment';

it('renders successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Time time={moment()} />, div);
});
