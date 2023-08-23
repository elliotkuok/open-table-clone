class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :date, null: false
      t.string :time, null: false
      t.integer :party_size, null: false
      t.string :occasion
      t.string :special_request

      t.timestamps
    end
  end
end
