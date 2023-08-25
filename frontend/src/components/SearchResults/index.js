import { useLocation } from 'react-router-dom';
import { searchRestaurants } from '../../store/restaurants';
import { useEffect, useState } from "react";
import SearchBar from '../SearchBar';

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

  return (
    <div>
        <SearchBar />
      <h2>Search Results for: {query.get('q')}</h2>
      {console.log("results JSX:", results)}
      {results.map(restaurant => (
        <div key={restaurant.id}>
          {restaurant.name}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
