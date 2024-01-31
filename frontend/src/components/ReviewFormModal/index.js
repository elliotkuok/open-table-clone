import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ReviewFormModal.css';
import StarRating from './StarRating';

function ReviewFormModal({onClose, currentUser, restaurant, reservation}){
    const {id} = useParams();


    const handleCloseModal = () => {
        onClose();
    };

    return (
            <div className='ratings-modal-container'>
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
                <div id='ratings-modal-content'>
                    <h1>{currentUser.firstName}, how was your experience at {restaurant.name}</h1>
                    <p>Rate your dining experience (required)</p>
                    <p>Reservation made on {reservation.date}</p>
                    <div id='ratings-container'>
                        <div className='rating'>
                            <p className='rating-title'>Overall</p>
                            <StarRating />
                            <p className='rating-placeholder'>Placeholder</p>
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Food</p>
                            <StarRating />
                            <p className='rating-placeholder'>Placeholder</p>
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Service</p>
                            <StarRating />
                            <p className='rating-placeholder'>Placeholder</p>
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Ambience</p>
                            <StarRating />
                            <p className='rating-placeholder'>Placeholder</p>
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Value</p>
                            <StarRating />
                            <p className='rating-placeholder'>Placeholder</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
    );
}

export default ReviewFormModal;