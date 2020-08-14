import React from 'react';
import ReactDOM from 'react-dom';

import Weather from './Weather';

it('renders successfully', async () => {
  ReactDOM.render(
    <Weather
      get_weather={() => {
        return Promise.resolve({ temp: 20 });
      }}
      update_interval={5 * 1000}
    />,
    document.createElement('div')
  );
});
