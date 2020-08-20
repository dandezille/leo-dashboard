import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';

import Weather from './Weather';

const server = setupServer(
  rest.get('/weather.json', (req, res, ctx) => {
    return res(ctx.json({ main: { temp: 20 } }));
  }));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders successfully', async () => {
  render(<Weather update_interval={5 * 1000} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('20 °C')).toBeInTheDocument();
});
