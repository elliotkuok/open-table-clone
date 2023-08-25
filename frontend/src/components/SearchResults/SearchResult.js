import { useState } from 'react'
import { restaurantImages } from '../../context/restaurantImages';

const SearchResult = ({restaurant, handleTileClick}) => {
    const [restaurantImage] = useState(restaurantImages[Math.floor(Math.random() * restaurantImages.length)]);


    return (
        <div className='result-container' onClick={() => handleTileClick(restaurant)}>
          <div className='res-img-container'>
            <img
              src={restaurantImage}
              alt="Placeholder"
              style={{ width: '205px', height: '205px', borderRadius: '4px' }}
            />
          </div>
          <div className='restaurant-info'>
            <div>{restaurant.name}</div>
            <div className='overview-info-component'>
              <div>
                <i data-star={restaurant.rating}></i>
              </div>
              <div className='info-details'>{restaurant.rating}</div>
            </div>
          </div>
        </div>
      );
}

export default SearchResult;