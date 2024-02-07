const RatingStars = ({avgOverallRating}) => {
    return (
        <div className='rating-stars'>
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < avgOverallRating ? 'red-star' : 'grey-star'}>
                ★
                </span>
            ))}
        </div>
    )
}

export default RatingStars;