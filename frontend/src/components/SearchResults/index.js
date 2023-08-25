import { useLocation } from 'react-router-dom';
import { searchRestaurants } from '../../store/restaurants';
import { useEffect, useState } from "react";
import SearchBar from '../SearchBar';
import './SearchResults.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const [results, setResults] = useState([]);
  console.log("Before useEffect:", results)
  useEffect(() => {
    const keyword = query.get('q');
    if (keyword) {
      searchRestaurants(keyword).then(data => setResults(data));
    }
  }, [query]);
  console.log("After useEffect:", results)

  const history = useHistory();

    const handleTileClick = (restaurant) => {
        history.push(`/restaurants/${restaurant.id}`);
    };

  return (
    <div className='page-container'>
        <SearchBar />
        <div className='search-results-container'>
            <h2>You searched for "{query.get('q')}" in San Francisco Bay Area</h2>
            {console.log("results JSX:", results)}
            {results.map(restaurant => (
                <div key={restaurant.id} className='result-container' onClick={() => handleTileClick(restaurant)}>
                    <div className='res-img-container'>
                        <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="Placeholder"
                        style={{ width: '4rem', height: '4rem', borderRadius: '4px' }}
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
            ))}
        </div>

    </div>
  );
}

export default SearchResults;
