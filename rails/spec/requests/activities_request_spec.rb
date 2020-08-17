require 'rails_helper'

RSpec.describe "Activities", type: :request do

  describe "GET /activities" do
    it "shows activities" do
      activities = create_list(:activity, 3)

      get "/activities"
      expect(response).to have_http_status(:success)

      expect(response).to render_template(:index)
      expect(assigns(:activities)).to eq(activities)
    end

    it "returns activities as json" do
      create(:activity, time: '08:00', symbol: 'a')
      create(:activity, time: '09:00', symbol: 'b')
      create(:activity, time: '10:00', symbol: 'c')

      get "/activities.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json.length).to eq(3)

      expect(response.body).to include_json(
         "08:00": "a",
         "09:00": 'b',
         "10:00": 'c' 
      )
    end
  end

  describe "GET /activities/:id/edit" do
    it 'shows edit page' do
      activity = create(:activity)

      get edit_activity_path(activity)
      expect(response).to have_http_status(:success)

      expect(response).to render_template(:edit)
      expect(assigns(:activity)).to eq(activity)
    end
  end

end
