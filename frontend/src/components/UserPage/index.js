import { useDispatch, useSelector } from "react-redux";
import './UserPage.css';
import { fetchReservations, selectAllReservations } from "../../store/reservations";
import { useEffect } from "react";
import ReservationTile from "./ReservationTile"

const UserPage = () => {
    const reservationsObj = useSelector(selectAllReservations)
    const reservations = Object.values(reservationsObj).filter(Boolean)
    {console.log("res value", reservations)}
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchReservations())
    },[dispatch])

    if (!reservations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="reservation-list-container">
            <h3>Upcoming Reservations</h3>
            <ul className="reservation-list">
                {reservations.map(reservation => (
                    <li key={reservation?.id} className="reservation-index">
                        <ReservationTile reservation={reservation}/>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}

export default UserPage;