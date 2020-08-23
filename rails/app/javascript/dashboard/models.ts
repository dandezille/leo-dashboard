export type WeatherData = {
  main: {
    temp: number;
  };
};

export type ActivitiesData = {
  [time: string]: string;
};

export type Activity = {
  start: moment.Moment;
  symbol: string;
};
