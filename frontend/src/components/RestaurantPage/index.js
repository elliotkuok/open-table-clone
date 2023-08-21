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
                                <div className='review-info'>
                                    <div>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        >
                                        <path d="M19,4 L5,4 C3.8954305,4 3,4.8954305 3,6 L3,15 C3,16.1045695 3.8954305,17 5,17 L11,17 L15.36,20.63 C15.6583354,20.8784924 16.0735425,20.9318337 16.4250008,20.7668198 C16.776459,20.6018059 17.0006314,20.2482681 17,19.86 L17,17 L19,17 C20.1045695,17 21,16.1045695 21,15 L21,6 C21,4.8954305 20.1045695,4 19,4 Z M19,15 L15,15 L15,17.73 L11.72,15 L5,15 L5,6 L19,6 L19,15 Z" fill="#2D333F" fill-rule="nonzero"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        Reviews
                                    </div>
                                    
                                </div>
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