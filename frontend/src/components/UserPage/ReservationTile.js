import { useDispatch, useSelector } from "react-redux";
import './UserPage.css';
import { fetchReservations, selectAllReservations } from "../../store/reservations";
import { useEffect } from "react";

const ReservationTile = () => {
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
        <div className="reservation-tile-container">
            <p>Test</p>
        </div>
    )
}

export default ReservationTile;