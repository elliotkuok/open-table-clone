import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservation} from "../../store/reservations";
import { fetchUser } from "../../store/users";

const UserReview = ({review}) => {
    const dispatch = useDispatch();
    const userId = review.userId;
    
    const reservationDate = useSelector(state => state.reservations[review.reservationId]?.date);
    const user = useSelector((state) => state.users[userId]);
    
    useEffect(() => {
        const reservationId = parseInt(review.reservationId, 10);
        dispatch(fetchReservation(reservationId));
        dispatch(fetchUser(userId))
    }, [dispatch, review.reservationId])

    const colors = ["#6c8ae4", "#d86441", "#bb6acd", "#df4e96"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    
    return (
        <div className='rst-user-review-container'>
            <div className='rst-user-profile'>
                <button className="review-profile-pic" style={{ backgroundColor: randomColor }}>
                    <span>
                        {user?.firstName[0]}{user?.lastName[0]}
                    </span>
                </button>
                <p>{user?.firstName}</p>
                {/* <p># of reviews</p> */}
            </div>
            <div className='rst-user-review'>
                <div className='rating-date-container'>
                    <div className="review-stars-container">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index} className={index < review?.overallRating ? 'red-star' : 'grey-star'}>
                            ★
                            </span>
                        ))}
                    </div>
                    <p>Dined on {reservationDate}</p>
                </div>
                <div className='rating-breakdown-container'>
                    {/* <p>Overall <span>{review.overallRating}</span></p> */}
                    <p className="highlight-rating-title">Food <span>{review.foodRating}</span></p>
                    <p className="highlight-rating-title">Service <span>{review.serviceRating}</span></p>
                    <p className="highlight-rating-title">Ambience <span>{review.ambienceRating}</span></p>
                    <p className="highlight-rating-title">Value <span>{review.valueRating}</span></p>
                </div>
                <p className="review-content-ele">{review.content ? review.content : <br></br>}</p>
                <div className='helpful-report-container'>
                    <div className="helpful-btn-container">
                        <button type="button" aria-label="Upvote review"><span><svg viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.07049H2C2.55228 7.07049 3 7.51821 3 8.07049V16.0705C3 16.6228 2.55228 17.0705 2 17.0705H0V7.07049Z" fill="#2D333F"></path><path fillRule="evenodd" clipRule="evenodd" d="M13 6.09932L14.6392 3.36735C14.6938 3.27644 14.7417 3.18172 14.7826 3.08391C15.2524 1.96086 14.7228 0.6696 13.5997 0.199813C12.329 -0.331748 10.7363 0.276501 10.2586 1.09453L5.41206 7.42401C5.14482 7.77302 5 8.20035 5 8.63992V15.0688C5 16.1902 5.89543 17.0993 7 17.0993H16.3604C17.3138 17.0993 18.1346 16.4161 18.3216 15.4671L20.0047 8.09932L19.9934 7.78088C19.909 6.73034 19.0435 6.09932 18 6.09932H13ZM13.1969 2.59565L10.5 7.87049H17.9532L16.3718 15.0216C16.3679 15.04 16.3649 15.0541 16.3625 15.0648C16.3552 15.098 16.3549 15.0993 16.3604 15.0993C16.3604 15.0993 7 15.0924 7 15.0688V8.63992C7 8.63992 11.8275 2.00085 12 1.94831C12.239 1.87552 12.6845 1.98488 12.8279 2.04489C12.932 2.08841 13.2537 2.46534 13.1969 2.59565Z" fill="#2D333F"></path></svg></span></button>
                        <p>Is this helpful?</p>
                    </div>
                    <button className="report-btn" type="button"><span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.55 3.9 16 8l3.52 4c.278.263.449.619.48 1a1 1 0 0 1-1 1H6v7a1 1 0 1 1-2 0V4a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1 1.94 1.94 0 0 1-.45.9ZM6 4v8h10.86L14.5 9.32 13.34 8l1.15-1.31L16.82 4H6Z" fill="#6f737b"></path></svg></span>Report</button>
                </div>
            </div>
        </div>
    )
}

export default UserReview;