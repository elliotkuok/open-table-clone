import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurant} from '../../store/restaurants'
import { useState } from 'react'
import { selectRestaurant } from '../../store/restaurants'
import restaurantImage from '../RestaurantPage/assets/restaurant.jpeg';

const RestaurantTile = ({restaurant}) => {
    const dispatch = useDispatch();

    const getPriceSymbol = (price) => {
        if (price === '$30 and under') {
            return '$';
        } else if (price === '$31 to $50') {
            return '$$';
        } else if (price === '$50 and over') {
            return '$$$';
        } else {
            return price;
        }
    };

    return (
        <>
            <div className='tile-img-container'>
                <img src={restaurantImage}></img>
            </div>
            <div className='tile-info'>
                <h5>{restaurant.name}</h5>
                <div className='overview-info-component'>
                    <div>
                        <i data-star={restaurant.rating}></i>
                    </div>
                    <p id='review-count'>10 reviews</p>
                </div>
                <p>{restaurant.cuisine} • {getPriceSymbol(restaurant.price)} • {restaurant.neighborhood}</p>
            </div>
        </>
    )
}

export default RestaurantTile;