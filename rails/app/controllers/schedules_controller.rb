class SchedulesController < ApplicationController
  def index
    render json: Schedule.all.to_json(only: [:id, :name])
  end
end
