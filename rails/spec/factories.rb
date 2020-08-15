FactoryBot.define do
  factory :activity do
    time { Time.now }
    symbol { 's' }
    note { 'test activity' }
  end
end
