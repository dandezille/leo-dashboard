import { rest } from 'msw';

const handlers = [
  rest.get('/weather.json', (req, res, ctx) => {
    return res(ctx.json({ main: { temp: 20 } }));
  }),
];

export { handlers };
