import React, { useState } from 'react';
import './CancelForm.css';
import { useDispatch } from 'react-redux';
import { destroyReservation } from '../../store/reservations';
import { useHistory } from 'react-router-dom';

function CancelForm(reservationId) {

    // const currentUser = useSelector(state => state.session.user);
    // const reservation = useSelector(state => state.reservations.reservations[id]);

    const resId = parseInt(reservationId.reservationId);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCancelButton = async () => {
        await dispatch(destroyReservation(resId));

        history.push('/');
    }

    return (
        <div className='cancel-form-container'>
            <h1>Are you sure you want to cancel this reservation?</h1>
            <h2>Restaurant Name</h2>
            <div className='table-details'>
                <p>Size</p>
                <p>Date</p>
                <p>Time</p>
            </div>
            <div>
                <a>Nevermind</a>
                <button onClick={handleCancelButton}>Confirm cancellation</button>
            </div>
        </div>
    );
}

export default CancelForm;