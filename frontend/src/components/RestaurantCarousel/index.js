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

    const chineseRestaurants = Object.values(restaurants).filter(restaurant => restaurant.cuisine === "African");

    return (
        <div className="carousel-container">
            <div className="restaurant-carousel">
                {chineseRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="carousel-item restaurant-index">
                        <RestaurantTile restaurant={restaurant} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantCarousel;
