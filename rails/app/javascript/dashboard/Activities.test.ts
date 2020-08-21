import moment from 'moment';
import { ActivitiesFactory } from './Activities';

const activities = (time: moment.Moment) => {
  const factory = new ActivitiesFactory({
    '10:00': '️a',
    '12:00': '️b️',
  });

  return {
    current: factory.current(time),
    next: factory.next(time),
  };
};

describe('#current', () => {
  it('returns current activity details', () => {
    const activity = activities(moment('10:05', 'HH:mm')).current;
    expect(activity.start).toEqual(moment('10:00', 'HH:mm'));
    expect(activity.symbol).toEqual('️a');
  });

  it('handles last activity of the day', () => {
    const activity = activities(moment('12:05', 'HH:mm')).current;
    expect(activity.start).toEqual(moment('12:00', 'HH:mm'));
    expect(activity.symbol).toEqual('️b️');
  });
});

describe('#next', () => {
  it('returns next activity details', () => {
    const activity = activities(moment('10:05', 'HH:mm')).next;
    expect(activity.start).toEqual(moment('12:00', 'HH:mm'));
    expect(activity.symbol).toEqual('️b️');
  });

  it('handles last activity of the day', () => {
    const activity = activities(moment('12:05', 'HH:mm')).next;
    expect(activity.start).toEqual(moment('10:00', 'HH:mm'));
    expect(activity.symbol).toEqual('️a');
  });
});
