export default interface WeatherProvider {
  fetch(): Promise<any>;
}

class OpenWeatherMapProvider implements WeatherProvider {
  async fetch() {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=d69dc974f03525bb28591d7132bbf921"
    );

    return await response.json();
  }
}

export function create_open_weather_map_provider() {
  return new OpenWeatherMapProvider();
}
