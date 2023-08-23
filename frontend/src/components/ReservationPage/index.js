import { useDispatch, useSelector } from "react-redux";
import './ReservationPage.css';
import { fetchReservation, selectReservation } from "../../store/reservations";
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useEffect } from "react";

const ReservationPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const reservation = useSelector(selectReservation(id));

    useEffect(() => {
        dispatch(fetchReservation(id));
      }, [dispatch, id]);

    if (!reservation) {
        return;
    }
    
    return (
        <div className="reservation-list-container">
            <div>
                <div className='res-details-container'>
                    <div className='res-img-container'>
                        <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="Placeholder"
                        style={{ width: '4rem', height: '4rem', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <h1>Reservation Page</h1>
                    </div>

                </div>

            </div>
            <div className="diner-details">
                <h3>{reservation.userId}</h3>

            </div>
            
        </div>
    )
}

export default ReservationPage;