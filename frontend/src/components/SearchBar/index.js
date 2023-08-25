import { useDispatch, useSelector } from "react-redux";
import './SearchBar.css';
import { searchRestaurants } from "../../store/restaurants";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SearchBar = () => {
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
        <div className="search-bar-container">
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
                <button onClick={handleSubmit}>Find a table</button>
            </div>
        </div>
    )
}

export default SearchBar;