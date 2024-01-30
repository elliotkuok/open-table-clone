class Restaurant < ApplicationRecord
    validates :name, :address, :description, :phone, :cuisine, :price, :neighborhood, presence: true
    validates :description, length: { maximum: 1000 }
    has_many :reservations
    has_many :reviews

    has_one_attached :photo
end
