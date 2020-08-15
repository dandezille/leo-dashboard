require 'rails_helper'

RSpec.describe "Activities", type: :request do

  describe "GET /index" do
    it "shows activities" do
      get "/activities"
      expect(response).to have_http_status(:success)
      expect(response).to render_template(:index)

      activities = assigns(:activities)
      expect(activities).not_to be_nil
      activities.each do |activity|
        expect(response.body).to include(activity.symbol)
      end
    end

    it "returns activities as json" do
      headers = { "ACCEPT" => "application/json" }
      get "/activities", headers: headers
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq(20)
    end
  end

end
