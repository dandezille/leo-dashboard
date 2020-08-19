import React from 'react';
import ReactDOM from 'react-dom';

import Weather from './Weather';

it('renders successfully', async () => {
  ReactDOM.render(
    <Weather update_interval={5 * 1000} />,
    document.createElement('div')
  );
});
