FactoryBot.define do
  sequence(:name) { |n| "Schedule #{n}" }

  factory :schedule do
    name
  end

  sequence(:symbol) { |n| n.to_s }
  sequence(:note) { |n| "test activity #{n}" }

  factory :activity do
    schedule
    time { Time.now }
    symbol 
    note 
  end
end
