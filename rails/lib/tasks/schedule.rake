namespace :schedule do
  desc "Sample data for local development environment"
  task assign: :environment do

    default_schedule = Schedule.find_or_create_by!(name: 'default')
    activities = Activity.where(schedule: nil)

    puts "Updating #{activities.count} activities"

    ActiveRecord::Base.transaction do
      activities.each do |activity|
        activity.update!(schedule: default_schedule)
        print "."
      end
    end

    puts " Done!"
  end
end
