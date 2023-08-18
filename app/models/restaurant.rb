class Restaurant < ApplicationRecord
    validates :name, :address, :description, :phone, :cuisine, :price, :neighborhood, presence: true
    validates :description, length: { maximum: 500 }
    has_many :reservations
    has_many :reviews
end
