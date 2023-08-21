import React from 'react';
import restaurantImage from './assets/restaurant.jpeg';
import './RestaurantPage.css';

const RestaurantPage = () => {
    return (
        <div className="page-container">
            <div className="content">
                {/* <div className="restaurant-banner">
                    <img className="banner-image" src={restaurantImage} alt="restaurant" />
                </div> */}
                <div className="restaurant-banner" style={{ backgroundImage: `url(${restaurantImage})` }}></div>
                <div className="restaurant-container">
                    <div className='restaurant-info'>
                        <div className='restaurant-tabs'>
                            <a href="#overview">
                                Overview
                            </a>
                            <a href="#reviews">
                                Reviews
                            </a>
                        </div>
                        <div className='overview'>
                            <h1>Restaurant Name</h1>
                            <div className='overview-info'>
                                <div>Rating Info</div>
                                <div>Review no.</div>
                                <div>Price range</div>
                                <div>Cuisine</div>
                            </div>
                            <div className='restaurant-description'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                    laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit in voluptate velit 
                                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                                    cupidatat non proident, sunt in culpa qui officia 
                                    deserunt mollit anim id est laborum.</p>
                            </div>
                            <div className='reviews'></div>
                        </div>
                    </div>
                    <div className='reservation-container'></div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage;