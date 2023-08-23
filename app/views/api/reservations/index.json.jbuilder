@reservations.each do |reservation|
    json.set! reservation.id do
        json.extract! reservation, :id, :restaurant_id, :user_id, :date, :time, :party_size, :occasion, :special_request, :created_at, :updated_at
    end
end
  