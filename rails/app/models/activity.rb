class Activity < ApplicationRecord
  belongs_to :schedule
  validates :time, :symbol, presence: true
  default_scope { order(:time) }
end
