import { rest } from 'msw';
import moment from 'moment';

const handlers = [
  rest.get('/weather.json', (req, res, ctx) => {
    return res(ctx.json({ main: { temp: 20 } }));
  }),
  rest.get('/activities.json', (req, res, ctx) => {
    const current = moment().subtract(30, 'minutes').format('HH:mm');
    const next = moment().add(30, 'minutes').format('HH:mm');
    return res(ctx.json({ current: 'current', next: 'next' }));
  }),
];

export { handlers };
