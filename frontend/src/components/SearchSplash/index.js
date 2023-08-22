import { useDispatch, useSelector } from "react-redux";
import './SearchSplash.css';
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect } from "react";

const SearchSplash = () => {
    // const restaurants = useSelector(selectAllRestaurants)
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //   dispatch(fetchRestaurants())
    // },[dispatch])
    
    return (
        <div class="search-banner-container">
            <h1>Find your table for any occasion</h1>
            <div className="search-inputs">
                <div className="search-dropdowns">
                    <input id="date-input"></input>
                    <input id="time-input"></input>
                    <input id="size-input"></input>
                </div>
                <input id="keyword-search"></input>
                <button>Let's go</button>
            </div>
        </div>
    )
}

export default SearchSplash