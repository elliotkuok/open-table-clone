import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect } from "react";
import React from 'react';
import RestaurantTile from '../RestaurantIndex/RestaurantTile';
import './RestaurantCarousel.css';

const RestaurantCarousel = () => {
    const restaurants = useSelector(selectAllRestaurants)
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchRestaurants())
    },[dispatch])

    const thaiRestaurants = Object.values(restaurants).filter(restaurant => restaurant.cuisine === "Thai");

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h3>Thai Restaurants</h3>
            </div>
            <div className="restaurant-carousel">
                {thaiRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="carousel-item restaurant-index">
                        <RestaurantTile restaurant={restaurant} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantCarousel;
