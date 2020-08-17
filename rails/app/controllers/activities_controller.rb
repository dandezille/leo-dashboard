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

  def new
    @activity = Activity.new
  end

  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      redirect_to activities_path
    else
      render :new
    end
  end

  def edit
    @activity = Activity.find_by(id: params[:id])
  end

  private

  def activity_params
    params.require(:activity).permit(:time, :symbol, :note)
  end

  def find_activity
    @activity = Activity.find_by(id: params[:id])
  end
end
