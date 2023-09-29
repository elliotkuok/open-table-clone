import { useDispatch, useSelector } from "react-redux";
import './ModifyReservationPage.css';
import "../SearchSplash/SearchSplash.css";
import { fetchReservation, selectReservation } from "../../store/reservations";
import { fetchRestaurant, selectRestaurant } from "../../store/restaurants";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import datePicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';
import { setSelectedTime, setSelectedDate, setSelectedSize } from '../../store/reservations';


const ModifyReservationPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const reservation = useSelector(selectReservation(id));
    const restaurantId = reservation?.restaurantId;
    let restaurant = dispatch(fetchRestaurant(restaurantId))

    let openingTime, closingTime;

    if (restaurant && restaurant.hours) {
    [openingTime, closingTime] = restaurant.hours.split(' - ');
    }

    console.log("restaurant:", restaurant)
    console.log("hours:", restaurant.hours)
    console.log("opening:", openingTime)
    console.log("closing:", closingTime)
    const [selectedDate, setChosenDate] = useState(new Date());
    const [suggestedTimes, setSuggestedTimes] = useState([]);

    let history = useHistory();

    useEffect(() => {
        dispatch(fetchReservation(id));
        dispatch(fetchRestaurant(restaurantId));
      }, [dispatch, id]);

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
                    setChosenDate(date);
                },
                showAllDates: true,
                minDate: new Date()
            });
        }
    }, []);
    
    if (!restaurant) {
        return;
    }

    const partySizeOptions = [];
    for (let i = 1; i <= 20; i++) {
        partySizeOptions.push(i);
    }

    const convertToMinutes = (time) => {
        // const [hoursMinutes, period] = time.split(' ');
        // let [hours, minutes] = hoursMinutes.split(':');
        // hours = parseInt(hours);
        // if (period === 'PM' && hours < 12) hours += 12;
        // if (period === 'AM' && hours === 12) hours = 0;
        // return hours * 60 + parseInt(minutes);
    };

    const convertTo12HourFormat = (minutes) => {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = minutes % 60;
        const period = hours < 12 ? 'AM' : 'PM';
        const displayHour = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
        return `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`;
    };

    // Generate time slots for time input drop down in 30-minute increments
    const generateTimeSlots = () => {

        const lastResMinutes = convertToMinutes(closingTime) - 90;
        const lastResHour = lastResMinutes < 0 ? convertTo12HourFormat(lastResMinutes + 24 * 60) : convertTo12HourFormat(lastResMinutes);

        const timeSlots = [];
        const timePeriods = ['AM', 'PM'];
    
        timePeriods.forEach(amPm => {
            for (let hour = 1; hour <= 12; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const displayHour = hour === 0 ? 12 : hour;
                    const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${amPm}`;
                    timeSlots.push(time);
                }
            }
        });
    
        const startIndex = timeSlots.indexOf(openingTime);
        const endIndex = timeSlots.indexOf(lastResHour);
        if (endIndex < startIndex) {
            return [...timeSlots.slice(startIndex), ...timeSlots.slice(0, endIndex + 1)];
        } else {
            return timeSlots.slice(startIndex, endIndex + 1);
        }
    };
    
    const timeSlots = generateTimeSlots();

    const getSuggestedTimes = (selectedTime) => {
        const times = [];
    
        const selectedMinutes = convertToMinutes(selectedTime);
        const openingMinutes = convertToMinutes(openingTime);
        const closingMinutes = convertToMinutes(closingTime) - 90;
    
        const intervals = [-30, -15, 0, 15, 30];
    
        intervals.forEach(interval => {
            const newTime = selectedMinutes + interval;
            if (newTime >= openingMinutes && newTime <= closingMinutes) {
                times.push(convertTo12HourFormat(newTime));
            }
        });
    
        return times;
    };
    
    const handleTimeSelect = (time) => {
        const selectedTime = document.querySelector("#time-input select").value;
        const selectedSize = document.querySelector("#party-size").value;
        const newSuggestedTimes = getSuggestedTimes(selectedTime);
        setSuggestedTimes(newSuggestedTimes);
        dispatch(setSelectedTime(time));
        const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(selectedDate);
        dispatch(setSelectedDate(formattedDate));
        dispatch(setSelectedSize(selectedSize));
        history.push(`/reservations/${id}/modify-form`);
    }
    
    return (
        <div className='reservation-page-container'>
            <div className='res-request-container'>
                <h4>Your current reservation</h4>
                <div className='res-details-container'>
                    <div className='res-img-container'>
                        <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="Placeholder"
                        style={{ width: '4rem', height: '4rem', borderRadius: '4px' }}
                        />
                    </div>
                    <div className='res-request-info'>
                    <h1>{reservation.restaurantName}</h1>
                        <div className='table-details'>
                            <div id='res-date'>
                                <div>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z" fill="#2D333F"></path>
                                    </svg>
                                </div>
                                <p>{reservation.date}</p>
                            </div>
                            <div id='res-time'>
                                <div>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z" fill="#2D333F"></path>
                                    </svg>
                                </div>
                                <p>{reservation.time}</p>
                            </div>
                            <div id='res-size'>
                                <div>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z" fill="#2D333F"></path>
                                    </svg>
                                </div>
                                <p>{reservation.partySize}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <form>
                    <div className="table-time-container">
                        <h4>Modify your reservation</h4>
                        <h5>Party Size</h5>
                        <select defaultValue={2} id="party-size">
                            {partySizeOptions.map(option => (
                                <option key={option} value={option}>{option} {option !== 1 ? 'people' : 'person'}</option>
                            ))}
                        </select>
                        <div id="date-time-container">
                            <div id="date-input">
                                <h5>Date</h5>
                                <input type="text" className="date-picker" />
                            </div>
                            <div id="time-input">
                                <h5>Time</h5>
                                <select>
                                    {timeSlots.map((timeSlot, index) => (
                                        <option key={index} value={timeSlot}>
                                            {timeSlot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button id="find-time-bttn" onClick={e => {
                            e.preventDefault();
                            const selectedTime = document.querySelector("#time-input select").value;
                            setSuggestedTimes(getSuggestedTimes(selectedTime));
                        }}>Find a new</button>
                        <div className="times-container">
                            {suggestedTimes.length > 0 && <h5>Select a time</h5>}
                            <div>
                                {
                                    suggestedTimes.map((time, index) => (
                                        <button key={index} className="suggested-time-bttn" onClick={() => handleTimeSelect(time)}>
                                            {time}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyReservationPage;