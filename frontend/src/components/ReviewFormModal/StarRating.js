import React, { useEffect, useState } from 'react';
import './ReviewFormModal.css';
import { Rating } from 'react-simple-star-rating';


const StarRating = ({ onRatingClick, initialRatings, category }) => {
    const [rating, setRating] = useState(initialRatings[category]);
    const [hover, setHover] = useState(null);
    const [clicked, setClicked] = useState(false); 
    const [hovered, setHovered] = useState(false);

    const placeholderTexts = [
        "Poor",
        "Fair",
        "Good",
        "Very good",
        "Outstanding"
    ];

    useEffect(() => {
        setRating(initialRatings[category]);
    }, [initialRatings, category]);
  
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
                                onChange={() => {
                                    setRating(currentRating);
                                    setClicked(true);
                                    onRatingClick(currentRating);
                                }}
                            />
                            <span
                                className="star"
                                style={{
                                    color:
                                        currentRating <= (hover || rating) ? "#da3743" : "#e4e5e9",
                                }}
                                onMouseEnter={() => {
                                    setHover(currentRating);
                                    setHovered(true);
                                }}
                                onMouseLeave={() => {
                                    setHover(null);
                                    setHovered(false);
                                }}
                            >
                                &#9733;
                            </span>
                        </label>
                    );
                })}
            </div>
            <div className="placeholder-text">
                {hovered ? placeholderTexts[hover - 1] : (clicked ? placeholderTexts[rating - 1] : "")}
            </div>
        </div>
    );
  }
  

export default StarRating;
