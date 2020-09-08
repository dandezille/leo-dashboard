class SchedulesController < ApplicationController
  before_action :find_schedule, only: [:edit, :update, :destroy]

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

  def edit
  end

  def update
    if @schedule.update(schedule_params)
      redirect_to schedules_path
    else
      render :edit
    end
  end

  private

  def schedule_params
    params.require(:schedule).permit(:name)
  end

  def find_schedule
    @schedule = Schedule.find_by(id: params[:id])
  end
end
