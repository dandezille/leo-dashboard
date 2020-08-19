import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { render_dashboard } from './index';

it('renders successfully', async () => {
  render_dashboard(document.createElement('div'));
});
