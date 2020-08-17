class ActivitiesController < ApplicationController
  before_action :find_activity, only: [:edit, :update, :destroy]

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
    @activity = Activity.new(time: '00:00')
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
end
