export type WeatherMain = { temp: number; temp_min: number; temp_max: number };

export type Weather = {
  main: WeatherMain;
};

export type ActivitiesData = Array<{ start: string; symbol: string }>;

export type Activity = {
  start: moment.Moment;
  symbol: string;
};
