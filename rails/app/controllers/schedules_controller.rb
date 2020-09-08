class SchedulesController < ApplicationController
  def index
    @schedules = Schedule.all

    respond_to do |format|
      format.html
      format.json do
        render json: @schedules.to_json(only: [:id, :name])
      end
    end
  end

  def new
    @schedule = Schedule.new
  end

  def create
    @schedule = Schedule.new(schedule_params)
    if @schedule.save
      redirect_to schedules_path
    else
      render :new
    end
  end

  private

  def schedule_params
    params.require(:schedule).permit(:name)
  end
end
