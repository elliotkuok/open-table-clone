import { useDispatch, useSelector } from "react-redux";
import './UserPage.css';
import { fetchReservations, selectAllReservations } from "../../store/reservations";
import { useEffect } from "react";
import ReservationTile from "./ReservationTile"
import { useParams } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";

const UserPage = () => {
    const reservationsObj = useSelector(selectAllReservations)
    const reservations = Object.values(reservationsObj).filter(Boolean)
    const {id} = useParams();
    const userId = id
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchReservations())
    },[dispatch])

    if (!reservations) {
        return <div>Loading...</div>;
    }

    const currentDateTime = moment();

    const upcomingReservations = reservations
        .filter(reservation => moment(reservation.date + ' ' + reservation.time).isAfter(currentDateTime))
        .sort((a, b) => moment(a.date + ' ' + a.time).diff(moment(b.date + ' ' + b.time)));

    const pastReservations = reservations
        .filter(reservation => moment(reservation.date + ' ' + reservation.time).isBefore(currentDateTime))
        .sort((a, b) => moment(b.date + ' ' + b.time).diff(moment(a.date + ' ' + a.time)));

    return (
    <div className="background">
        <div className="reservation-list-container">
            <h3>Upcoming reservations</h3>
            <ul className="reservation-list">
                {upcomingReservations.map(reservation => (
                    <li key={reservation?.id} className="reservation-index">
                        <ReservationTile reservation={reservation} isUpcoming={true}/>
                    </li>
                        
                ))}
            </ul>
        </div>
        <div className="reservation-list-container">
            <h3>Past reservations</h3>
            <ul className="reservation-list">
                {pastReservations.map(reservation => (
                    <li key={reservation?.id} className="reservation-index">
                        <ReservationTile reservation={reservation} isUpcoming={false}/>
                    </li>                        
                ))}
            </ul>
        </div>
    </div>

    )
}

export default UserPage;