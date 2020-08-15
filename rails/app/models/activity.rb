class Activity < ApplicationRecord
  validates :time, :symbol, presence: true
end
