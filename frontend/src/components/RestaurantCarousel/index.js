import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect, useState, useRef } from "react";
import React from 'react';
import RestaurantTile from '../RestaurantIndex/RestaurantTile';
import './RestaurantCarousel.css';
import { Link } from "react-router-dom/cjs/react-router-dom";

const CuisineCarousel = ({ cuisine }) => {
    const restaurants = useSelector(selectAllRestaurants);
    const dispatch = useDispatch();
    const [scrollAmount, setScrollAmount] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
      dispatch(fetchRestaurants());
    }, [dispatch]);

    const cuisineRestaurants = Object.values(restaurants).filter(restaurant => restaurant.cuisine === cuisine);

    const scrollLeft = () => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.querySelector(".carousel-item").offsetWidth;
            const scrollWidth = itemWidth * 5;
            const newScrollAmount = scrollAmount - scrollWidth;
            setScrollAmount(newScrollAmount);
            carouselRef.current.scrollTo({ left: newScrollAmount, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.querySelector(".carousel-item").offsetWidth;
            const scrollWidth = itemWidth * 5;
            const newScrollAmount = scrollAmount + scrollWidth;
            setScrollAmount(newScrollAmount);
            carouselRef.current.scrollTo({ left: newScrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className={`carousel-container ${cuisine}-carousel`}>
            <div className="carousel-header">
                <h3>{cuisine} Restaurants</h3>
            </div>
            <div className="restaurant-carousel-container">
                <div className="restaurant-carousel" ref={carouselRef}>
                    {cuisineRestaurants.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="carousel-item restaurant-index">
                            <RestaurantTile restaurant={restaurant} />
                        </Link>
                    ))}
                </div>
                <button className="carousel-button left-button" onClick={scrollLeft}>&lt;</button>
                <button className="carousel-button right-button" onClick={scrollRight}>&gt;</button>
            </div>
        </div>

    );
};

const RestaurantCarousel = () => {
    return (
        <div className="carousels-container">
            <CuisineCarousel cuisine="Thai" />
            <CuisineCarousel cuisine="Mexican" />
            <CuisineCarousel cuisine="Senegalese" />
        </div>
    );
};

export default RestaurantCarousel;
