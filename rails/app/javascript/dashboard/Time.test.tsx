import React from 'react';
import { render } from '@testing-library/react';
import Time from './Time';
import moment from 'moment';

it('renders successfully', () => {
  render(<Time time={moment()} />);
});
