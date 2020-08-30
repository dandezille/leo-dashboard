class Schedule < ApplicationRecord
  has_many :activities, dependent: :destroy
  validates :name, presence: true,
                   uniqueness: true
end
