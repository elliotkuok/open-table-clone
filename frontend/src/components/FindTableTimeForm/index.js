import { useDispatch, useSelector } from "react-redux";
import './FindTableTimeForm.css';
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect } from "react";

const FindTableTime = () => {
    // const restaurants = useSelector(selectAllRestaurants)
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //   dispatch(fetchRestaurants())
    // },[dispatch])

    const partySizeOptions = [];
    for (let i = 1; i <= 20; i++) {
        partySizeOptions.push(i);
    }
    
    return (
        <div class="table-time-container">
            <h4>Make a reservation</h4>
            <h5>Party Size</h5>
            <select>
                {partySizeOptions.map(option => (
                    <option key={option} value={option}>{option} {option !== 1 ? 'people' : 'person'}</option>
                ))}
            </select>
            <div id="date-time-container">
                <div id="date-input">
                    <h5>Date</h5>
                    <select></select>
                </div>
                <div id="time-input">
                    <h5>Time</h5>
                    <select></select>
                </div>
            </div>    
        </div>
    )
}

export default FindTableTime;