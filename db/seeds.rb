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
    Reservation.destroy_all
    Restaurant.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('restaurants')
    ApplicationRecord.connection.reset_pk_sequence!('reservations')


    puts "Creating users..."
    # Create a demo user
    User.create!(
        email: 'demo@user.io', 
        password: 'password',
        first_name: 'Demo',
        last_name: 'User',
        phone_number: '5103626446'
    )

    puts "Creating restaurants..."
    # Create restaurants
    500.times do 
        Restaurant.create!({
        name: Faker::Restaurant.unique.name,
        # address: Faker::Address.unique.street_address + ", San Francisco, CA 94102",
        address: [
            '22 Hawthorne St, San Francisco, CA 94105',
            '1529 Fillmore St, San Francisco, CA 94115',
            '5700 Geary Blvd, San Francisco, CA 94121',
            '525 Cortland Ave, San Francisco, CA 94110',
            '517 Hayes St, San Francisco, CA 94102',
            '132 The Embarcadero, San Francisco, CA 94105',
            '665 Townsend St, San Francisco, CA 94103',
            '620 Gough St., San Francisco, 94102, USA',
            '22 Franklin St., San Francisco, 94102, USA',
            '1085 Mission St., San Francisco, 94103, USA'
        ].sample,
        description: Faker::Restaurant.description[0, 1000],
        phone: Faker::PhoneNumber.unique.phone_number,
        cuisine: Faker::Restaurant.type,
        price: ['$30 and under','$31 to $50','$50 and over'].sample,
        rating: (rand * 5).round(1),
        # neighborhood: Faker::Address.community,
        neighborhood: ["Mission District", "Nob Hill", "Chinatown", "North Beach", "SOMA", "Haight-Ashbury", "Tenderloin", "Russian Hill", "Marina District", "Sunset"].sample,
        hours: ["10:30 AM - 11:00 PM", "6:30 AM - 3:00 PM", "5:00 PM - 01:00 AM", "8:30 AM - 11:00 PM"].sample,
        dining_style: ['Casual', 'Fine Dining', 'Quick Bites', 'Barbecue', 'Bistro', 'Brasserie', 'Buffet', 'Cafe', 'Diner', 'Family Style', 'Fast Food', 'Gastropub', 'Pizzeria', 'Pub', 'Steakhouse', 'Sushi', 'Tapas/Small Plates', 'Vegetarian/Vegan'].sample,
        dress_code: ["Casual", "Business Casual", "Smart Casual", "Dressy", "None"].sample,
        parking_details: ["Street Parking", "Public Parking Lot", "Valet Parking", "Garage Parking", "Parking Garage Nearby", "Private Lot", "On-site Parking", "Paid Parking", "Complimentary Valet", "Self-Parking", "Nearby Parking", "Covered Parking", "Free Parking", "Metered Parking", "Hotel Parking", "Secure Parking", "Ample Parking", "Parking Available", "Designated Parking Area"].sample,
        website: Faker::Internet.url
        }) 
    end

    puts "Creating reservations..."
    # Create a demo user
    Reservation.create!(
        restaurant_id: 1, 
        user_id: 1,
        date: 'Aug 22, 2024',
        time: '8:00 PM',
        party_size: 2
    )

    Reservation.create!(
        restaurant_id: 5, 
        user_id: 1,
        date: 'Aug 22, 2023',
        time: '7:30 PM',
        party_size: 6
    )


    puts "Done!"
end
