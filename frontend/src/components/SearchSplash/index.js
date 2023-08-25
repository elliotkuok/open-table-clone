import { useDispatch, useSelector } from "react-redux";
import './SearchSplash.css';
import { searchRestaurants } from "../../store/restaurants";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SearchSplash = () => {
    // const restaurants = useSelector(selectAllRestaurants)
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //   dispatch(fetchRestaurants())
    // },[dispatch])
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (keyword) {
        searchRestaurants(keyword).then(data => setResults(data));
        } else {
        setResults([]);
        }
    }, [keyword]);

    const handleSubmit = () => {
        history.push(`/search?q=${keyword}`);
    };
    
    return (
        <div className="search-banner-container">
            <h1>Find your table for any occasion</h1>
            <form on onSubmit={handleSubmit}>
                <div className="search-inputs">
                    <div className="search-dropdowns">
                        <input id="date-input"></input>
                        <input id="time-input"></input>
                        <input id="size-input"></input>
                    </div>
                    <input
                        id="keyword-search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={`Location, Restaurant, or Cuisine`}
                    />
                    <button type="submit">Let's go</button>
                </div>
            </form>    
        </div>
    )
}

export default SearchSplash;