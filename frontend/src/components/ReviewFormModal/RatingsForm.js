import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function RatingsForm({onClose}){
    const {id} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const reservation = useSelector(state => state.reservations[id]);

    const dispatch = useDispatch();
    const history = useHistory();

    // const handleCancelButton = async () => {
    //     await dispatch(destroyReservation(reservation.id));

    //     history.push(`/user/${currentUser.id}`);
    // }

    const handleCloseModal = () => {
        onClose();
    };

    return (
            <div className='cancel-form-container'>
                <div id="x-icon" onClick={handleCloseModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                
                <div>
                    <h2>{reservation.restaurantName}</h2>
                    <div className='table-details'>
                        <div className='cancel-res-details' id='cancel-res-size'>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.002 8a5 5 0 1 1 7.572 4.288c2.43.594 4.162 2.108 5.192 4.543A3 3 0 0 1 17.004 21H7a3 3 0 0 1-2.763-4.169c1.03-2.435 2.759-3.949 5.19-4.543A4.995 4.995 0 0 1 7.002 8Zm2 0A2.999 2.999 0 1 0 15 8a3 3 0 1 0-6 0Zm-2.31 10.949a.994.994 0 0 0 .316.051h9.987a1 1 0 0 0 .95-1.314C17.13 15.229 15.15 14 12.002 14c-3.15 0-5.13 1.229-5.943 3.686a.999.999 0 0 0 .634 1.263Z" fill="#2D333F"></path></svg>
                            <p>{reservation.partySize}</p>
                        </div>
                        <div className='cancel-res-details'>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a1 1 0 0 1 2 0v1h6V4a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4ZM5 7v2h14V7H5Zm0 4v8h14v-8H5Z" fill="#2D333F"></path></svg>
                            <p>{reservation.date} at {reservation.time}</p>
                        </div>
                    </div>
                </div>
                <div id='cancelation-btns'>
                    <a onClick={handleCloseModal}>Nevermind</a>
                    {/* <button onClick={handleCancelButton}>Confirm cancellation</button> */}
                </div>
            </div>
    );
}

export default RatingsForm;