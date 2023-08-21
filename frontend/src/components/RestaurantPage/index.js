import React, { useEffect } from 'react';
import restaurantImage from './assets/restaurant.jpeg';
import './RestaurantPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant, selectAllRestaurants, selectRestaurant } from '../../store/restaurants';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const RestaurantPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const restaurant = useSelector(selectRestaurant(id));

    useEffect(() => {
        dispatch(fetchRestaurant(id));
      }, [dispatch, id]);

    if (!restaurant) {
        return;
    }
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
                            <h1>{restaurant.name}</h1>
                            <div className='overview-info'>
                                <div>{restaurant.rating}</div>
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
                                    <div>Reviews</div>
                                </div>
                                <div className='review-info'>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            >
                                            <path d="M20,15 L20,9 L18.5,9 C18.2238576,9 18,8.77614237 18,8.5 L18,7 L6,7 L6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4,9 L4,15 L5.5,15 C5.77614237,15 6,15.2238576 6,15.5 L6,17 L18,17 L18,15.5 C18,15.2238576 18.2238576,15 18.5,15 L20,15 Z M4,5 L20,5 C21.1045695,5 22,5.8954305 22,7 L22,17 C22,18.1045695 21.1045695,19 20,19 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,7 C2,5.8954305 2.8954305,5 4,5 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z" fill="#2D333F"></path>
                                        </svg>
                                    </div>
                                    <div>{restaurant.price}</div>
                                </div>
                                <div className='review-info'>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            >
                                            <path d="M11,2 C12.1045695,2 13,2.8954305 13,4 L13,11 C13,12.1045695 12.1045695,13 11,13 L10,13 L10,21 C10,21.5522847 9.55228475,22 9,22 L8,22 C7.44771525,22 7,21.5522847 7,21 L7,13 L6,13 C4.8954305,13 4,12.1045695 4,11 L4,4 C4,2.8954305 4.8954305,2 6,2 L11,2 Z M11,11 L11,4 L10,4 L10,8.5 C10,8.77614237 9.77614237,9 9.5,9 C9.22385763,9 9,8.77614237 9,8.5 L9,4 L8,4 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,4 L6,4 L6,11 L11,11 Z M19.45,2 C19.7537566,2 20,2.24624339 20,2.55 L20,21 C20,21.5522847 19.5522847,22 19,22 L18,22 C17.4477153,22 17,21.5522847 17,21 L17,17 L16,17 C14.8954305,17 14,16.1045695 14,15 L14,7.45 C14,4.44004811 16.4400481,2 19.45,2 Z M16,15 L18,15 L18,4.32 C16.7823465,4.88673047 16.0026709,6.10692278 16,7.45 L16,15 Z" fill="#2D333F" fill-rule="nonzero"></path>
                                        </svg>
                                    </div>
                                    <div>{restaurant.cuisine}</div>
                                </div>
                            </div>
                            <div className='restaurant-description'>
                                <p>{restaurant.description}</p>
                            </div>
                            <div className='reviews'></div>
                        </div>
                    </div>
                    <div className='restaurant-sidebar'>
                        <div className='reservation-container'></div>
                        <div className='map-container'>
                            <div id='map'></div>
                            <div className='address'>
                                <div>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.8133333 17.5666667,16.59 12.7,21.33 C12.3111565,21.7111429 11.6888435,21.7111429 11.3,21.33 C6.43333333,16.59 4,12.8133333 4,10 C4,5.581722 7.581722,2 12,2 Z M12,4 C8.6862915,4 6,6.6862915 6,10 C6,11.21 6.8,14 12,19.21 C17.2,14 18,11.21 18,10 C18,6.6862915 15.3137085,4 12,4 Z M12,7 C13.6568542,7 15,8.34314575 15,10 C15,11.6568542 13.6568542,13 12,13 C10.3431458,13 9,11.6568542 9,10 C9,8.34314575 10.3431458,7 12,7 Z M12,9 C11.4477153,9 11,9.44771525 11,10 C11,10.5522847 11.4477153,11 12,11 C12.5522847,11 13,10.5522847 13,10 C13,9.44771525 12.5522847,9 12,9 Z" fill="#2D333F"></path>
                                    </svg>
                                </div>
                                <a href='#'>{restaurant.address}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage;