import { useDispatch, useSelector } from "react-redux";
import './UserPage.css';
import { fetchReservations, selectAllReservations } from "../../store/reservations";
import { useEffect } from "react";
import ReservationTile from "./ReservationTile"

const UserPage = () => {
    const reservations = useSelector(selectAllReservations)
    const dispatch = useDispatch()
    console.log("reservations", reservations)
    useEffect(() => {
      dispatch(fetchReservations())
    },[dispatch])
    console.log("after useEffect", reservations)

    if (!reservations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="reservation-list-container">
            <h3>Upcoming Reservations</h3>
            <ul className="reservation-list">
                {Object.values(reservations).map(reservation => (
                    <li key={reservation?.id} className="reservation-index">
                        <ReservationTile reservationId={reservation?.id}/>
                    </li>
                ))}
            </ul>
            {console.log("jsx:", reservations)}
        </div>
    )
}

export default UserPage;