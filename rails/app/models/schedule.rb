class Schedule < ApplicationRecord
  has_many :activities, dependent: :destroy
  validates :name, presence: true,
                   uniqueness: true
  default_scope { order(:name) }
end
