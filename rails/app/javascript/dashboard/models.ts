export type WeatherMain = {
  temp: number;
}
export type Weather = {
  main: WeatherMain;
};

export type ActivitiesDataElement = { start: string; symbol: string };
export type ActivitiesData = Array<ActivitiesDataElement>;

export type Activity = {
  start: moment.Moment;
  symbol: string;
};
