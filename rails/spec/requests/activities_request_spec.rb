require 'rails_helper'

RSpec.describe "Activities", type: :request do

  describe "GET /index" do
    it "shows activities" do
      activities = create_list(:activity, 3)

      get "/activities"
      expect(response).to have_http_status(:success)

      expect(response).to render_template(:index)
      expect(assigns(:activities)).to eq(activities)
    end

    it "returns activities as json" do
      create_list(:activity, 3)

      get "/activities.json"
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end
  end

end
