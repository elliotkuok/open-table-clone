@restaurants.each do |restaurant|
    json.set! restaurant.id do
        json.extract! restaurant, :id, :name, :address, :description, :phone, :cuisine, :price, :rating, :neighborhood, :hours, :dining_style, :dress_code, :parking_details, :website, :image, :created_at, :updated_at
    end
end
  