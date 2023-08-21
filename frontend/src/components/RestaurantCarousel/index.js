import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect, useState } from "react";
import React from 'react';
import RestaurantTile from '../RestaurantIndex/RestaurantTile';
import './RestaurantCarousel.css';

const RestaurantCarousel = () => {
    const restaurants = useSelector(selectAllRestaurants)
    const dispatch = useDispatch()
    const [scrollAmount, setScrollAmount] = useState(0);
    
    useEffect(() => {
      dispatch(fetchRestaurants())
    },[dispatch])

    const scrollLeft = () => {
        const carousel = document.querySelector(".restaurant-carousel");
        const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
        const scrollWidth = itemWidth * 5;
        setScrollAmount(scrollAmount - scrollWidth);
        carousel.scrollTo({ left: scrollAmount - scrollWidth, behavior: "smooth" });
    };
    
    const scrollRight = () => {
        const carousel = document.querySelector(".restaurant-carousel");
        const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
        const scrollWidth = itemWidth * 5;
        setScrollAmount(scrollAmount + scrollWidth);
        carousel.scrollTo({ left: scrollAmount + scrollWidth, behavior: "smooth" });
    };

    const thaiRestaurants = Object.values(restaurants).filter(restaurant => restaurant.cuisine === "Thai");

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h3>Thai Restaurants</h3>
            </div>
            <div className="restaurant-carousel">
                <button className="carousel-button left-button" onClick={scrollLeft}>&lt;</button>
                {thaiRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="carousel-item restaurant-index">
                        <RestaurantTile restaurant={restaurant} />
                    </div>
                ))}
                <button className="carousel-button right-button" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

export default RestaurantCarousel;
