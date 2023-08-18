json.restaurant do
    json.extract! @restaurant, :id, :name, :address, :description, :phone, :cuisine, :price, :rating, :neighborhood, :hours, :dining_style, :dress_code, :parking_details, :website, :created_at, :updated_at
end