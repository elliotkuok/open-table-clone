json.array! @reservations do |reservation|
    json.extract! reservation, :id, :restaurant_id, :date, :time, :party_size, :occasion, :special_request, :created_at, :updated_at
end
