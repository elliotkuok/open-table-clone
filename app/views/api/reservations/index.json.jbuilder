# json.array! @reservations do |reservation|
#     json.extract! reservation, :id, :restaurant_id, :date, :time, :party_size, :occasion, :special_request, :created_at, :updated_at
# end

@reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :restaurant_id, :user_id, :date, :time, :party_size, :occasion, :special_request, :created_at, :updated_at
        json.restaurant_name reservation.restaurant.name
        json.review reservation.review&.id
    end
end
