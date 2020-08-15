require 'rails_helper'

RSpec.describe "Activities", type: :request do

  describe "GET /index" do
    it "returns http success" do
      headers = { "ACCEPT" => "application/json" }
      get "/activities", headers: headers
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq(20)
    end
  end

end
