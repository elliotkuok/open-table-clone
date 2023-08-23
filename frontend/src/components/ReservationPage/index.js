import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservation, selectReservation } from '../../store/reservations';

import './ReservationPage.css';

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
        <div className='reservation-page-container'>
            <h1>Restaurant Name</h1>
        </div>
    )
}

export default ReservationPage;