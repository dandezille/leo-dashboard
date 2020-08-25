class WeatherController < ApplicationController
  def index
    query = { q: 'Dublin,IE', 
              units: 'metric', 
              appid: ENV.fetch('WEATHER_API_KEY') }
    response = HTTParty.get('http://api.openweathermap.org/data/2.5/weather', 
                            query: query)

    data = JSON.parse response.body

    weather = {
      'temp' => data['main']['temp'],
      'temp_min' => data['main']['temp_min'],
      'temp_max' => data['main']['temp_max']
    }

    render :ok, json: weather
  end
end
