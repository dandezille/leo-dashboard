if Rails.env.development? || Rails.env.test?
  require "factory_bot"

  namespace :dev do
    desc "Sample data for local development environment"
    task prime: "db:setup" do
      include FactoryBot::Syntax::Methods

      create(:activity, time: Time.parse('08:00'), symbol: '⏰', note: 'wake up')
      create(:activity, time: Time.parse('08:15'), symbol: '🥐', note: 'breakfast')
      create(:activity, time: Time.parse('08:45'), symbol: '🦷', note: 'Teeth and face wash')
      create(:activity, time: Time.parse('09:00'), symbol: '🇫🇷', note: 'French story and drawing')
      create(:activity, time: Time.parse('09:15'), symbol: '️🚶', note: 'Walk')
      create(:activity, time: Time.parse('10:00'), symbol: '️☕',  note: 'Coffee and listen')
      create(:activity, time: Time.parse('10:30'), symbol: '️🧩', note: 'Play')
      create(:activity, time: Time.parse('11:45'), symbol: '️📺', note: 'Cartoon')
      create(:activity, time: Time.parse('12:15'), symbol: '️🍽️', note: 'Lunch and listen')
      create(:activity, time: Time.parse('13:15'), symbol: '️️️📖️', note: 'Story')
      create(:activity, time: Time.parse('13:30'), symbol: '️️️️🛏️', note: 'Nap')
      create(:activity, time: Time.parse('15:00'), symbol: '️️️📖️', note: 'Story')
      create(:activity, time: Time.parse('15:15'), symbol: '️️️🧩️', note: 'Play')
      create(:activity, time: Time.parse('16:30'), symbol: '️🚶', note: 'Walk')
      create(:activity, time: Time.parse('17:00'), symbol: '️️️🧩️', note: 'Play')
      create(:activity, time: Time.parse('18:00'), symbol: '️️️📺', note: 'Cartoon')
      create(:activity, time: Time.parse('18:30'), symbol: '️🍽️', note: 'Dinner and listen')
      create(:activity, time: Time.parse('19:15'), symbol: '️️️🛀', note: 'Bath or shower')
      create(:activity, time: Time.parse('19:45'), symbol: '🦷', note: 'Teeth and face wash')
      create(:activity, time: Time.parse('20:00'), symbol: '🛏️', note: 'Bed')
    end
  end
end
