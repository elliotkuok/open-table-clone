// import { useDispatch, useSelector } from "react-redux";
// import './RestaurantIndex.css';
// import { fetchRestaurants, selectAllRestaurants } from "../../store/restaurants";
// import { useEffect } from "react";
// import RestaurantTile from "./RestaurantTile";

// const RestaurantIndex = () => {
//     const restaurants = useSelector(selectAllRestaurants)
//     const dispatch = useDispatch()
    
//     useEffect(() => {
//       dispatch(fetchRestaurants())
//     },[dispatch])
    
//     return (
//         <div className="restaurant-list-container">
//             <h3>Available Restaurants</h3>
//             <ul className="restaurant-list">
//                 {Object.values(restaurants).map(restaurant => (
//                     <li key={restaurant.id} className="restaurant-index">
//                         <RestaurantTile restaurant={restaurant} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default RestaurantIndex;