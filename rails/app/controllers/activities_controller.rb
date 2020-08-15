class ActivitiesController < ApplicationController
  def index
    @activities = Activity.all

    respond_to do |format|
      format.html
      format.json do
        render json: @activities.to_h { |a| [a.time.strftime('%H:%M'), a.symbol] }
      end
    end
  end
end
