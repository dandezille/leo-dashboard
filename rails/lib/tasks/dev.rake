namespace :dev do
  desc "Sample data for local development environment"
  task prime: "db:setup" do

    schedule = Schedule.find_or_create_by!(name: 'default')

    schedule.activities.create!(time: Time.parse('08:00'), symbol: '⏰', note: 'wake up')
    schedule.activities.create!(time: Time.parse('08:15'), symbol: '🥐', note: 'breakfast')
    schedule.activities.create!(time: Time.parse('08:45'), symbol: '🦷', note: 'Teeth and face wash')
    schedule.activities.create!(time: Time.parse('09:00'), symbol: '🇫🇷', note: 'French story and drawing')
    schedule.activities.create!(time: Time.parse('09:15'), symbol: '️🚶', note: 'Walk')
    schedule.activities.create!(time: Time.parse('10:00'), symbol: '️☕',  note: 'Coffee and listen')
    schedule.activities.create!(time: Time.parse('10:30'), symbol: '️🧩', note: 'Play')
    schedule.activities.create!(time: Time.parse('11:45'), symbol: '️📺', note: 'Cartoon')
    schedule.activities.create!(time: Time.parse('12:15'), symbol: '️🍽️', note: 'Lunch and listen')
    schedule.activities.create!(time: Time.parse('13:15'), symbol: '️️️📖️', note: 'Story')
    schedule.activities.create!(time: Time.parse('13:30'), symbol: '️️️️🛏️', note: 'Nap')
    schedule.activities.create!(time: Time.parse('15:00'), symbol: '️️️📖️', note: 'Story')
    schedule.activities.create!(time: Time.parse('15:15'), symbol: '️️️🧩️', note: 'Play')
    schedule.activities.create!(time: Time.parse('16:30'), symbol: '️🚶', note: 'Walk')
    schedule.activities.create!(time: Time.parse('17:00'), symbol: '️️️🧩️', note: 'Play')
    schedule.activities.create!(time: Time.parse('18:00'), symbol: '️️️📺', note: 'Cartoon')
    schedule.activities.create!(time: Time.parse('18:30'), symbol: '️🍽️', note: 'Dinner and listen')
    schedule.activities.create!(time: Time.parse('19:15'), symbol: '️️️🛀', note: 'Bath or shower')
    schedule.activities.create!(time: Time.parse('19:45'), symbol: '🦷', note: 'Teeth and face wash')
    schedule.activities.create!(time: Time.parse('20:00'), symbol: '🛏️', note: 'Bed')
  end
end
