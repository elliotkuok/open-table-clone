import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ReviewFormModal.css';
import StarRating from './StarRating';
import { patchReview, postReview, selectAllReviews } from '../../store/reviews';

function ReviewFormModal({onClose, currentUser, restaurant, reservation}){
    const {id} = useParams();
    const dispatch = useDispatch();

    const reviews = useSelector(selectAllReviews);
    const initialRatings = reviews[reservation.reviewId] || {
        overallRating: null,
        foodRating: null,
        serviceRating: null,
        ambienceRating: null,
        valueRating: null,
    };

    const [ratings, setRatings] = useState(initialRatings);
    const [reviewContent, setReviewContent] = useState(initialRatings?.content);

    const handleCloseModal = () => {
        onClose();
    };

    const handleRatingChange = (category, value) => {
        setRatings({
            ...ratings,
            [category]: value,
        });
    };

    const handleSubmit = async () => {
        const reviewData = {
            reservationId: parseInt(id, 10),
            overallRating: ratings.overallRating,
            foodRating: ratings.foodRating,
            serviceRating: ratings.serviceRating,
            ambienceRating: ratings.ambienceRating,
            valueRating: ratings.valueRating,
            content: reviewContent
        };
        if (reservation.reviewId) {
            try {
                await dispatch(patchReview(reviewData, reservation.id));
                onClose();
            } catch (error) {
                console.error('Error updating review:', error);
            }
        } else {
            try {
                await dispatch(postReview(reviewData, reservation.id));
                onClose();
            } catch (error) {
                console.error('Error creating review:', error);
            }
        }
    };

    return (
            <div className='ratings-modal-container'>
                <div className="x-icon" onClick={handleCloseModal}>
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
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('overallRating', value)}
                            initialRatings={initialRatings}
                            category="overallRating"
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Food</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('foodRating', value)}
                            initialRatings={initialRatings}
                            category="foodRating"
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Service</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('serviceRating', value)}
                            initialRatings={initialRatings}
                            category="serviceRating"
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Ambience</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('ambienceRating', value)}
                            initialRatings={initialRatings}
                            category="ambienceRating"
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Value</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('valueRating', value)}
                            initialRatings={initialRatings}
                            category="valueRating"
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            placeholder='Please enter your review here (optional)'
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button type='submit' onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                
                
            </div>
    );
}

export default ReviewFormModal;