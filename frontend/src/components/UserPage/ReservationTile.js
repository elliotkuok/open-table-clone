import './UserPage.css';
import { useEffect } from "react";

const ReservationTile = ({reservation}) => {
    // console.log("ReservationTile", reservation)
    return (
        <div className="reservation-tile-container">
            <p>{reservation.date}</p>
            {/* <p>hi</p> */}
        </div>
    )
}

export default ReservationTile;