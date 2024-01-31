@reviews.each do |review|
    json.set! review.id do
      json.extract! review, :id, :reservation_id, :overall_rating, :food_rating, :service_rating, :ambience_rating, :value_rating, :content, :created_at, :updated_at
    end
end
