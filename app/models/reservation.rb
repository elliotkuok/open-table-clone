class Reservation < ApplicationRecord
  validates :date, :time, :party_size, presence: true
  validates :party_size, numericality: { greater_than: 0 }

  belongs_to :restaurant
  belongs_to :user
  has_one :review
end
