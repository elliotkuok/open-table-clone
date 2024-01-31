class Review < ApplicationRecord
  validates :overall_rating, :food_rating, :service_rating, :ambience_rating, :value_rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  
  belongs_to :reservation

end
