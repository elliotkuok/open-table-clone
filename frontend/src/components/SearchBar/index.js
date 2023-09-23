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
                    <input id="date-input" type="text" className="date-picker"></input>
                    <select id="time-input" value={selectedTime} onChange={(e) => dispatch(setSelectedTime(e.target.value))}>
                            {timeSlots.map((timeSlot, index) => (
                                <option key={index} value={timeSlot}>
                                    {timeSlot}
                                </option>
                            ))}
                        </select>
                    <select defaultValue={selectedSize} id="size-input"onChange={(e) => dispatch(setSelectedSize(e.target.value))}>
                        {partySizeOptions.map(option => (
                            <option key={option} value={option}>
                                {option} {option !== 1 ? 'people' : 'person'}
                            </option>
                        ))}
                    </select>
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
    )
}

export default SearchBar;