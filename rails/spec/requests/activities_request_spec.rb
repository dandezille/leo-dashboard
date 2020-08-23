require 'rails_helper'

RSpec.describe "Activities", type: :request do

  describe "GET /activities" do
    it "returns activities as json" do
      create(:activity, time: '08:00', symbol: 'a')
      create(:activity, time: '09:00', symbol: 'b')
      create(:activity, time: '10:00', symbol: 'c')

      get "/activities.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json).to eq([
        { 'start'=> "08:00", 'symbol'=> "a" },
        { 'start'=> "09:00", 'symbol'=> 'b' },
        { 'start'=> "10:00", 'symbol'=> 'c' } 
      ])
    end
  end
end
