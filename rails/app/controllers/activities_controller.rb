class ActivitiesController < ApplicationController
  before_action :find_activity, only: [:edit, :update, :destroy]

  def index
    @activities = Activity.all

    respond_to do |format|
      format.html
      format.json do
        render json: @activities.map { |a| { start: a.time.strftime('%H:%M'), symbol: a.symbol } }.to_a
      end
    end
  end

  def new
    @activity = default_schedule.activities.new(time: '00:00')
  end

  def create
    @activity = default_schedule.activities.new(activity_params)
    if @activity.save
      redirect_to activities_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @activity.update(activity_params)
      redirect_to activities_path
    else
      render :edit
    end
  end

  def destroy
    @activity.destroy
    redirect_to activities_path
  end

  private

  def activity_params
    params.require(:activity).permit(:time, :symbol, :note)
  end

  def find_activity
    @activity = Activity.find_by(id: params[:id])
  end

  def default_schedule
    Schedule.find_by!(name: 'default')
  end
end
