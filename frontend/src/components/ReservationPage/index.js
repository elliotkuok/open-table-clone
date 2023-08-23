import { useDispatch, useSelector } from "react-redux";
import './ReservationPage.css';
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect } from "react";

const RestaurantPage = () => {
    const restaurants = useSelector(selectAllRestaurants)
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchRestaurants())
    },[dispatch])
    
    return (
        <div className="restaurant-list-container">
            <h3>Reservation Page</h3>
            
        </div>
    )
}

export default RestaurantPage;