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

    return (
        <div className="restaurant-carousel">
            {Object.values(restaurants).map(restaurant => (
                <div key={restaurant.id} className="carousel-item restaurant-index">
                <RestaurantTile restaurant={restaurant} />
                </div>
            ))}
        </div>
    );
};

export default RestaurantCarousel;
