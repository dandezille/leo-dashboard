class AddScheduleRefToActivities < ActiveRecord::Migration[6.0]
  def change
    add_reference :activities, :schedule, foreign_key: true
  end
end
