require 'rails_helper'

RSpec.describe "Weather", type: :request do

  describe "GET /weather" do
    it "returns weather as json" do
      stub_request(:get, 'http://api.openweathermap.org/data/2.5/weather')
        .with(query: { q: 'Dublin,IE', 
                       units: 'metric',
                       appid: 'test_api_key' })
        .to_return(status: 200, body: "{}", headers: {})


      ClimateControl.modify WEATHER_API_KEY: 'test_api_key' do
        get "/weather.json"
      end

      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json).to eq({})
    end
  end
end
