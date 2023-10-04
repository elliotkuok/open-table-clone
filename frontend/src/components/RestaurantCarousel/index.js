import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect, useState } from "react";
import React from 'react';
import RestaurantTile from '../RestaurantIndex/RestaurantTile';
import './RestaurantCarousel.css';
import { Link } from "react-router-dom/cjs/react-router-dom";

const CuisineCarousel = ({ cuisine }) => {
    const restaurants = useSelector(selectAllRestaurants);
    const dispatch = useDispatch();
    const [scrollAmount, setScrollAmount] = useState(0);

    useEffect(() => {
      dispatch(fetchRestaurants());
    }, [dispatch]);

    const scrollLeft = () => {
        const carousel = document.querySelector(`.${cuisine}-carousel`);
        const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
        const scrollWidth = itemWidth * 5;
        setScrollAmount(scrollAmount - scrollWidth);
        carousel.scrollTo({ left: scrollAmount - scrollWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        const carousel = document.querySelector(`.${cuisine}-carousel`);
        const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
        const scrollWidth = itemWidth * 5;
        setScrollAmount(scrollAmount + scrollWidth);
        carousel.scrollTo({ left: scrollAmount + scrollWidth, behavior: "smooth" });
    };

    const cuisineRestaurants = Object.values(restaurants).filter(restaurant => restaurant.cuisine === cuisine);

    return (
        <div className={`carousel-container ${cuisine}-carousel`}>
            <div className="carousel-header">
                <h3>{cuisine} Restaurants</h3>
            </div>
            <div className="restaurant-carousel-container"> {/* Added this wrapper */}
                <div className="restaurant-carousel">
                    {cuisineRestaurants.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="carousel-item restaurant-index">
                            <RestaurantTile restaurant={restaurant} />
                        </Link>
                    ))}
                </div>
                {/* <button className="carousel-button left-button" onClick={scrollLeft}>&lt;</button>
                <button className="carousel-button right-button" onClick={scrollRight}>&gt;</button> */}
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
