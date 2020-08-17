class ActivitiesController < ApplicationController
  before_action :find_activity, only: [:edit]

  def index
    @activities = Activity.all

    respond_to do |format|
      format.html
      format.json do
        render json: @activities.to_h { |a| [a.time.strftime('%H:%M'), a.symbol] }
      end
    end
  end

  def edit
    @activity = Activity.find_by(id: params[:id])
  end

  private

  def find_activity
    @activity = Activity.find_by(id: params[:id])
  end
end
