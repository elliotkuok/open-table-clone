class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.text :description, limit: 500, null: false  # Add the limit option here
      t.string :phone, null: false
      t.string :cuisine, null: false
      t.string :price, null: false
      t.float :rating
      t.string :neighborhood, null: false
      t.string :hours
      t.string :dining_style
      t.string :dress_code
      t.string :parking_details
      t.string :website

      t.timestamps
    end
    add_index :restaurants, :name
    add_index :restaurants, :cuisine
    add_index :restaurants, :neighborhood
  end
end
