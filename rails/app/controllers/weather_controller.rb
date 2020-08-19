class WeatherController < ApplicationController
  def index
    query = { q: 'Dublin,IE', 
              units: 'metric', 
              appid: ENV.fetch('WEATHER_API_KEY') }
    response = HTTParty.get('http://api.openweathermap.org/data/2.5/weather', 
                            query: query)
    render :ok, json: { code: response.body }
  end
end
