class Activity < ApplicationRecord
  validates :time, :symbol, presence: true
  default_scope { order(:time) }
end
