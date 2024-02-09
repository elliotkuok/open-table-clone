# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

image_urls = [
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/1.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/2.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/3.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/4.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/5.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/6.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/7.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/8.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/9.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/10.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/11.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/12.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/13.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/14.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/15.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/16.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/17.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/18.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/19.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/20.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/21.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/22.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/23.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/24.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/25.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/26.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/27.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/28.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/29.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/30.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/31.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/32.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/33.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/34.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/35.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/36.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/37.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/38.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/39.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/40.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/41.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/42.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/43.avif',
    'https://readytable-seeds.s3.us-west-1.amazonaws.com/44.avif',
  ]

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    Reservation.destroy_all
    Restaurant.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('restaurants')
    ApplicationRecord.connection.reset_pk_sequence!('reservations')
    ApplicationRecord.connection.reset_pk_sequence!('reviews')


    puts "Creating users..."
    # Create a demo user
    User.create!(
        email: 'demo@user.io', 
        password: 'password',
        first_name: 'Demo',
        last_name: 'User',
        phone_number: '5103626446'
    )

    User.create!(
        email: 'user1@example.com',
        password: 'password',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '1234567890'
    )
    
    User.create!(
        email: 'user2@example.com',
        password: 'password',
        first_name: 'Jane',
        last_name: 'Smith',
        phone_number: '9876543210'
    )
    
    User.create!(
        email: 'user3@example.com',
        password: 'password',
        first_name: 'Alice',
        last_name: 'Johnson',
        phone_number: '5555555555'
    )
    
    User.create!(
        email: 'user4@example.com',
        password: 'password',
        first_name: 'Bob',
        last_name: 'Brown',
        phone_number: '7777777777'
    )
    
    User.create!(
        email: 'user5@example.com',
        password: 'password',
        first_name: 'Eva',
        last_name: 'Williams',
        phone_number: '8888888888'
    )
    
    User.create!(
        email: 'user6@example.com',
        password: 'password',
        first_name: 'Michael',
        last_name: 'Davis',
        phone_number: '9999999999'
    )
    
    User.create!(
        email: 'user7@example.com',
        password: 'password',
        first_name: 'Sophia',
        last_name: 'Wilson',
        phone_number: '3333333333'
    )
    
    User.create!(
        email: 'user8@example.com',
        password: 'password',
        first_name: 'Matthew',
        last_name: 'Moore',
        phone_number: '4444444444'
    )
    
    User.create!(
        email: 'user9@example.com',
        password: 'password',
        first_name: 'Olivia',
        last_name: 'Lee',
        phone_number: '6666666666'
    )
    
    User.create!(
        email: 'user10@example.com',
        password: 'password',
        first_name: 'Daniel',
        last_name: 'Taylor',
        phone_number: '2222222222'
    )
    
    puts "Creating restaurants..."
    # Create restaurants
    300.times do 
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
        website: Faker::Internet.url,
        image: image_urls.sample
        }) 
    end

    puts "Creating reservations..."
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

    Reservation.create!(
        restaurant_id: 2, 
        user_id: 1,
        date: 'Dec 8, 2023',
        time: '7:30 PM',
        party_size: 4
    )

    Reservation.create!(
        restaurant_id: 4, 
        user_id: 1,
        date: 'Sep 15, 2023',
        time: '7:30 PM',
        party_size: 4
    )

    Reservation.create!(
        restaurant_id: 2,
        user_id: 2,
        date: 'Jan 10, 2023',
        time: '12:00 PM',
        party_size: 6
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 3,
        date: 'Feb 5, 2023',
        time: '1:30 PM',
        party_size: 8
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 4,
        date: 'Mar 20, 2023',
        time: '3:45 PM',
        party_size: 10
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 5,
        date: 'Apr 8, 2023',
        time: '5:15 PM',
        party_size: 4
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 6,
        date: 'May 15, 2023',
        time: '6:30 PM',
        party_size: 7
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 7,
        date: 'Jun 25, 2023',
        time: '2:45 PM',
        party_size: 9
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 8,
        date: 'Jul 12, 2023',
        time: '4:30 PM',
        party_size: 5
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 9,
        date: 'Aug 8, 2023',
        time: '7:00 PM',
        party_size: 11
    )
    
    Reservation.create!(
        restaurant_id: 2,
        user_id: 10,
        date: 'Sep 1, 2023',
        time: '8:00 PM',
        party_size: 12
    )   

    1000.times do
        Reservation.create!(
            restaurant_id: rand(1..300),
            user_id: rand(2..10),
            date: Faker::Date.backward(days: 365).strftime("%b %e, %Y"),
            time: ["12:00 PM", "1:00 PM", "1:30 PM", "6:00 PM", "6:45 PM", "7:15 PM", "7:30 PM"].sample,  
            party_size: rand(1..12)
        )
    end


    puts "Creating reviews..."
    Review.create!(
        reservation_id: 2,
        overall_rating: 5,
        food_rating: 5,
        service_rating: 5,
        ambience_rating: 4,
        value_rating: 4,
        content: "I really love it here"
    )

    Review.create!(
        reservation_id: 3,
        overall_rating: 3,
        food_rating: 2,
        service_rating: 4,
        ambience_rating: 3,
        value_rating: 5,
        content: ""
    )

    Review.create!(
        reservation_id: 5,
        overall_rating: 3,
        food_rating: 3,
        service_rating: 4,
        ambience_rating: 2,
        value_rating: 3,
        content: "Not bad, could be better."
    )
    
    Review.create!(
        reservation_id: 6,
        overall_rating: 5,
        food_rating: 5,
        service_rating: 5,
        ambience_rating: 5,
        value_rating: 5,
        content: "Absolutely fantastic!"
    )
    
    Review.create!(
        reservation_id: 7,
        overall_rating: 4,
        food_rating: 4,
        service_rating: 3,
        ambience_rating: 4,
        value_rating: 4,
        content: "Good food, but service could improve."
    )
    
    Review.create!(
        reservation_id: 8,
        overall_rating: 2,
        food_rating: 2,
        service_rating: 1,
        ambience_rating: 3,
        value_rating: 2,
        content: "Disappointing experience."
    )
    
    Review.create!(
        reservation_id: 9,
        overall_rating: 5,
        food_rating: 5,
        service_rating: 5,
        ambience_rating: 5,
        value_rating: 5,
        content: "The best restaurant in town!"
    )
    
    Review.create!(
        reservation_id: 10,
        overall_rating: 3,
        food_rating: 4,
        service_rating: 3,
        ambience_rating: 3,
        value_rating: 2,
        content: "Average dining experience."
    )
    
    Review.create!(
        reservation_id: 11,
        overall_rating: 4,
        food_rating: 5,
        service_rating: 4,
        ambience_rating: 4,
        value_rating: 4,
        content: "Lovely atmosphere and great food."
    )
    
    Review.create!(
        reservation_id: 12,
        overall_rating: 5,
        food_rating: 5,
        service_rating: 5,
        ambience_rating: 5,
        value_rating: 5,
        content: "A truly wonderful dining experience!"
    )
    
    Review.create!(
        reservation_id: 13,
        overall_rating: 2,
        food_rating: 2,
        service_rating: 3,
        ambience_rating: 2,
        value_rating: 2
    )

    (14..1000).each do |reservation_id|
        Review.create!(
          reservation_id: reservation_id,
          overall_rating: rand(1..5),
          food_rating: rand(1..5),
          service_rating: rand(1..5),
          ambience_rating: rand(1..5),
          value_rating: rand(1..5),
          content: Faker::Restaurant.review
        )
      end
      
    
    

    puts "Done!"
end
