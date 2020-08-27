FactoryBot.define do
  sequence(:symbol) { |n| n.to_s }
  sequence(:note) { |n| "test activity #{n}" }

  factory :activity do
    time { Time.now }
    symbol 
    note 
  end

  sequence(:name) { |n| "Schedule #{n}" }

  factory :schedule do
    name
  end
end
