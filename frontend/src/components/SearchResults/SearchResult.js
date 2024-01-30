import { useState } from 'react'

const SearchResult = ({restaurant, handleTileClick}) => {

    return (
        <div className='result-container' onClick={() => handleTileClick(restaurant)}>
          <div className='res-img-container'>
            <img
              src={restaurant.image}
              alt="Placeholder"
              style={{ width: '205px', height: '205px', borderRadius: '4px' }}
            />
          </div>
          <div className='restaurant-info'>
            <p>{restaurant.name}</p>
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