class WeatherController < ApplicationController
  def index
    render :ok, json: {}
  end
end
