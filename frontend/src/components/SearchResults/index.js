import { useLocation } from 'react-router-dom';
import { searchRestaurants } from '../../store/restaurants';
import { useEffect, useState } from "react";
import SearchBar from '../SearchBar';
import './SearchResults.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { restaurantImages } from '../../context/restaurantImages';
import SearchResult from './SearchResult';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const keyword = query.get('q');
      if (keyword) {
        try {
          const data = await searchRestaurants(keyword);
          setResults(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [query]);

  const history = useHistory();

    const handleTileClick = (restaurant) => {
        history.push(`/restaurants/${restaurant.id}`);
    };

  return (
    <div className='page-container'>
      <div id='searchBar-container'>
        <SearchBar />
      </div>
      <div className='search-results-container'>
        <h2>Results for "{query.get('q')}" in San Francisco Bay Area</h2>
        <p>{results.length} restaurants match "{query.get('q')}"</p>
        {results.map(restaurant => (
          <SearchResult
            key={restaurant.id}
            restaurant={restaurant}
            handleTileClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
