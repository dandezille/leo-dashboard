export type Weather = {
  main: {
    temp: number;
  };
};

export type ActivitiesData = Array<{ start: string; symbol: string }>;

export type Activity = {
  start: moment.Moment;
  symbol: string;
};
