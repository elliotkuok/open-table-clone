import { useDispatch, useSelector } from "react-redux";
import './RestaurantIndex.css';
import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
import { useEffect } from "react";

const RestaurantIndex = () => {
    const restaurants = useSelector(selectAllRestaurants)
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchRestaurants())
    },[dispatch])
    
    return (
        <>
            {Object.values(restaurants).map(restaurant => (
                <ul key={restaurant.id} className="restaurant-tile">
                    <p>{restaurant.name}</p>
                </ul>
            ))}
        </>
    )
}

export default RestaurantIndex