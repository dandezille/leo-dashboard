import React from 'react';
import { render } from '@testing-library/react';

import Weather from './Weather';

it('renders successfully', async () => {
  render(
    <Weather update_interval={5 * 1000} />
  );
});
