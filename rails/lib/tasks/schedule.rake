namespace :schedule do
  desc "Setup default schedule"
  task default: :environment do

    if Schedule.find_by(name: 'default')
      puts "default schedule already created"
    else
      puts "creating default schedule"
      Schedule.create!(name: 'default')
    end

    puts "done"
  end
end
