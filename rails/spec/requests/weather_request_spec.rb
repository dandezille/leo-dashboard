require 'rails_helper'

RSpec.describe "Weather", type: :request do

  describe "GET /weather" do
    it "returns weather as json" do
      get "/weather.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json).to eq({})
    end
  end
end
