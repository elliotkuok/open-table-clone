# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    # Create a demo user
    User.create!(
        email: 'demo@user.io', 
        password: 'password',
        first_name: 'Demo',
        last_name: 'User',
        phone_number: '5103626446'
    )

    # Create additional users
    10.times do 
        User.create!({
        email: Faker::Internet.unique.email,
        password: Faker::Internet.password(min_length: 6),
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        phone_number: Faker::PhoneNumber.phone_number
        }) 
    end

    puts "Done!"
end
  