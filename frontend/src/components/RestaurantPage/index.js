import React from 'react';
import restaurantImage from './assets/restaurant.jpeg';

const RestaurantPage = () => {
    return (
        <div className="page-container">
            <div className="content">
                <div className="restaurant-banner">
                    <img className="banner-image" src={restaurantImage} alt="restaurant" />
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage;