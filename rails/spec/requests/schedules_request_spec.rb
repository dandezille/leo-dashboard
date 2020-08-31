require 'rails_helper'

RSpec.describe "Schedules", type: :request do

  describe "GET /schedules" do
    it "returns schedules as json" do
      weekday = create(:schedule, name: 'weekday')
      saturday = create(:schedule, name: 'saturday')
      sunday = create(:schedule, name: 'sunday')

      get "/schedules.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json).to eq([
        { 'id'=> weekday.id, 'name'=> "weekday" },
        { 'id'=> saturday.id, 'name'=> 'saturday' },
        { 'id'=> sunday.id, 'name'=> 'sunday' } 
      ])
    end
  end
end
