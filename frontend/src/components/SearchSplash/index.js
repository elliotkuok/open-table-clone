import { useDispatch, useSelector } from "react-redux";
import './SearchSplash.css';
import { searchRestaurants } from "../../store/restaurants";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { setSelectedTime, setSelectedDate, setSelectedSize } from '../../store/reservations';
import SearchBar from "../SearchBar";

const SearchSplash = () => {
    // const restaurants = useSelector(selectAllRestaurants)
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //   dispatch(fetchRestaurants())
    // },[dispatch])
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const history = useHistory();
    const selectedTime = useSelector(state => state.reservations.selectedTime);
    const selectedDate = useSelector(state => state.reservations.selectedDate);
    const selectedSize = useSelector(state => state.reservations.selectedSize);

    const partySizeOptions = [];
    for (let i = 1; i <= 20; i++) {
        partySizeOptions.push(i);
    }

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
            <SearchBar />   
        </div>
    )
}

export default SearchSplash;