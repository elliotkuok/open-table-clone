import { useDispatch, useSelector } from "react-redux";
import './SearchBar.css';
import { searchRestaurants } from "../../store/restaurants";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { setSelectedTime, setSelectedDate, setSelectedSize } from '../../store/reservations';
import datePicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const history = useHistory();
    const selectedTime = useSelector(state => state.reservations.selectedTime);
    const selectedDate = useSelector(state => state.reservations.selectedDate);
    const selectedSize = useSelector(state => state.reservations.selectedSize);

    const timeSlots = [];

    const datePickerRef = useRef(null);

    useEffect(() => {
        if (!datePickerRef.current) {
            datePickerRef.current = datePicker('.date-picker', {
                dateSelected: selectedDate,
                formatter: (input, date, instance) => {
                    const options = { month: 'short', day: 'numeric', year: 'numeric' };
                    input.value = new Intl.DateTimeFormat('en-US', options).format(date);
                },
                onSelect: (instance, date) => {
                    dispatch(setSelectedDate(new Date(date).toLocaleDateString('en-US'))); // Update the selectedDate in the Redux store
                },
                showAllDates: true,
                minDate: new Date()
            });
        }
    }, []);
    
    const populateTimeSlots = () => {
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                let period = hour < 12 ? 'AM' : 'PM';
                let displayHour = hour % 12 === 0 ? 12 : hour % 12;
                let displayMinute = minute.toString().padStart(2, '0');
                timeSlots.push(`${displayHour}:${displayMinute} ${period}`);
            }
        }
    };

    populateTimeSlots();

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
       <form className="search-bar-container" onSubmit={handleSubmit}>
            <div className="search-inputs">
                <div className="search-dropdowns">
                    <div className="search-input">
                        <svg className="search-icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a1 1 0 0 1 2 0v1h6V4a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4ZM5 7v2h14V7H5Zm0 4v8h14v-8H5Z" fill="#2D333F"></path></svg>
                        <input id="date-input" type="text" className="date-picker"></input>
                    </div>
                    <div className="search-input">
                        <svg className="search-icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-5Z" fill="#2D333F"></path><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-2 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0Z" fill="#2D333F"></path></svg>
                        <select id="time-input" value={selectedTime} onChange={(e) => dispatch(setSelectedTime(e.target.value))}>
                            {timeSlots.map((timeSlot, index) => (
                                <option key={index} value={timeSlot}>
                                    {timeSlot}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-input">
                        <svg className="search-icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.002 8a5 5 0 1 1 7.572 4.288c2.43.594 4.162 2.108 5.192 4.543A3 3 0 0 1 17.004 21H7a3 3 0 0 1-2.763-4.169c1.03-2.435 2.759-3.949 5.19-4.543A4.995 4.995 0 0 1 7.002 8Zm2 0A2.999 2.999 0 1 0 15 8a3 3 0 1 0-6 0Zm-2.31 10.949a.994.994 0 0 0 .316.051h9.987a1 1 0 0 0 .95-1.314C17.13 15.229 15.15 14 12.002 14c-3.15 0-5.13 1.229-5.943 3.686a.999.999 0 0 0 .634 1.263Z" fill="#2D333F"></path></svg>
                        <select defaultValue={selectedSize} id="size-input"onChange={(e) => dispatch(setSelectedSize(e.target.value))}>
                            {partySizeOptions.map(option => (
                                <option key={option} value={option}>
                                    {option} {option !== 1 ? 'people' : 'person'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="search-input-container">
                    <svg className="search-icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.93 14.828a7 7 0 1 1 10.556-.757l3.939 3.94a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707 0l-3.94-3.94a7.002 7.002 0 0 1-9.142-.657Zm1.413-8.485a5 5 0 1 0 7.071 7.071 5 5 0 0 0-7.07-7.07Z" fill="#2D333F"></path></svg>
                    <input
                        id="keyword-search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={`Location, Restaurant, or Cuisine`}
                    />
                </div>
                <button type="submit">Let's go</button>
            </div>
        </form>
    )
}

export default SearchBar;