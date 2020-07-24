export interface WeatherData {
  temp: number;
}

export default interface WeatherProvider {
  fetch(): Promise<WeatherData>;
}

class OpenWeatherMapProvider implements WeatherProvider {
  async fetch() {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=d69dc974f03525bb28591d7132bbf921"
    );

    const data = await response.json();
    return {
      temp: data.main.temp,
    };
  }
}

class TestWeatherProvider implements WeatherProvider {
  private data: WeatherData;

  constructor(data: WeatherData) {
    this.data = data;
  }

  async fetch() {
    return Promise.resolve(this.data);
  }
}

export function create_open_weather_map_provider() {
  return new OpenWeatherMapProvider();
}

export function create_test_weather_provider(data: WeatherData) {
  return new TestWeatherProvider(data);
}
