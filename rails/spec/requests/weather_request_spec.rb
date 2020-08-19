require 'rails_helper'

RSpec.describe "Weather", type: :request do

  describe "GET /weather" do
    it "returns weather as json" do
      stub_request(:get, "http://api.openweathermap.org/data/2.5/weather?appid=d69dc974f03525bb28591d7132bbf921&q=Dublin,IE&units=metric")
        .to_return(status: 200, body: "{}", headers: {})

      get "/weather.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json).to eq({})
    end
  end
end
