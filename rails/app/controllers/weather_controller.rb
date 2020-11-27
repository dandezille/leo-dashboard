class WeatherController < ApplicationController
  def index
    data = fetch_weather_data
    filtered = filter_weather_data data
    render :ok, json: filtered
  end

  def full
    render :ok, json: fetch_weather_data
  end

  private 
  
  def weather_query
    { 
      lat: '49.215913',
      lon: '-2.183231',
      units: 'metric',
      exclude: 'minutely,hourly',
      appid: ENV.fetch('WEATHER_API_KEY')
    }
  end

  def weather_url
    'https://api.openweathermap.org/data/2.5/onecall'
  end

  def fetch_weather_data
    response = HTTParty.get(weather_url, query: weather_query)
    JSON.parse response.body
  end

  def filter_weather_data(data)
    {
      'temp' => data.dig('current', 'temp'),
      'temp_min' => data.dig('daily', 0, 'temp', 'min'),
      'temp_max' => data.dig('daily', 0, 'temp', 'max'),
    }
  end
end
