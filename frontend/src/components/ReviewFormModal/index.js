import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ReviewFormModal.css';
import StarRating from './StarRating';
import { fetchReview, patchReview, postReview, selectReview } from '../../store/reviews';

function ReviewFormModal({onClose, currentUser, restaurant, reservation, review}){
    const {id} = useParams();
    const dispatch = useDispatch();

    const initialRatings = {
        overallRating: review?.overallRating || null,
        foodRating: review?.foodRating || null,
        serviceRating: review?.serviceRating || null,
        ambienceRating: review?.ambienceRating || null,
        valueRating: review?.valueRating || null,
        content: review?.content || null
    };

    const [ratings, setRatings] = useState(initialRatings);
    const [reviewContent, setReviewContent] = useState(initialRatings?.content);

    const handleCloseModal = () => {
        onClose();
    };

    const handleRatingChange = (category, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    };

    const handleSubmit = async () => {
        const reservation_id = parseInt(id, 10);
        const overall_rating = ratings.overallRating;
        const food_rating = ratings.foodRating;
        const service_rating = ratings.serviceRating;
        const ambience_rating = ratings.ambienceRating;
        const value_rating = ratings.valueRating;
        const content = reviewContent

        const reviewData = {
            reservation_id,
            overall_rating,
            food_rating,
            service_rating,
            ambience_rating,
            value_rating,
            content: reviewContent
        };
        
        if (reservation.reviewId) {
            try {
                await dispatch(patchReview(reviewData, reservation.reviewId));
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
                    <p>Reservation dined on {reservation.date}</p>
                    <div id='ratings-container'>
                        <div className='rating'>
                            <p className='rating-title'>Overall</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('overallRating', value)}
                            initialRating={initialRatings.overallRating}
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Food</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('foodRating', value)}
                            initialRating={initialRatings.foodRating}
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Service</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('serviceRating', value)}
                            initialRating={initialRatings.serviceRating}
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Ambience</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('ambienceRating', value)}
                            initialRating={initialRatings.ambienceRating}
                            />
                        </div>
                        <div className='rating'>
                            <p className='rating-title'>Value</p>
                            <StarRating
                            onRatingClick={(value) => handleRatingChange('valueRating', value)}
                            initialRating={initialRatings.valueRating}
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            placeholder='Please enter your review here (optional)'
                            value={reviewContent || ""}
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