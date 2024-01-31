import React, { useState } from 'react';
import './ReviewFormModal.css';
import { Rating } from 'react-simple-star-rating';


const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const placeholderTexts = [
        "Poor",
        "Fair",
        "Good",
        "Very good",
        "Outstanding"
    ];
  
    return (
        <div className='stars-text'>
            <div className="star-rating-container">
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                        <label key={index}>
                            <input
                                key={star}
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                            />
                            <span
                                className="star"
                                style={{
                                    color:
                                        currentRating <= (hover || rating) ? "#da3743" : "#e4e5e9",
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                        </label>
                    );
                })}
            </div>
            <div className="placeholder-text">
                {hover ? placeholderTexts[hover - 1] : ""}
            </div>
        </div>
    );
  }
  

export default StarRating;
