import { rest } from 'msw';
import moment from 'moment';

import { Weather, ActivitiesData } from '../dashboard/models';

const handlers = [
  rest.get('/weather.json', (req, res, ctx) => {
    const test_weather: Weather = {
      main: { temp: 20, temp_min: 18, temp_max: 22 },
    };
    return res(ctx.json(test_weather));
  }),
  rest.get('/activities.json', (req, res, ctx) => {
    const current = moment().subtract(30, 'minutes').format('HH:mm');
    const next = moment().add(30, 'minutes').format('HH:mm');

    const activities: ActivitiesData = [
      { start: current, symbol: 'current' },
      { start: next, symbol: 'next' },
    ];

    return res(ctx.json(activities));
  }),
];

export { handlers };
