const UserReview = ({review}) => {
    
    return (
        <div className='rst-user-review-container'>
            <div className='rst-user-profile'>
                <button id="profile-button">
                    <span style={{ marginTop: '4px', marginLeft: '2px'}}>
                    DU
                    </span>
                </button>
                <p>Name</p>
                <p># of reviews</p>
            </div>
            <div className='rst-user-review'>
                <div className='rating-date-container'>
                    <span>★★★★★</span>
                    <p>Dined on (insert date)</p>
                </div>
                <div className='rating-breakdown-container'>
                    <p>Overall <span>{review.overallRating}</span></p>
                    <p>Food <span>{review.foodRating}</span></p>
                    <p>Service <span>{review.serviceRating}</span></p>
                    <p>Ambience <span>{review.ambienceRating}</span></p>
                    <p>Value <span>{review.valueRating}</span></p>
                </div>
                <p>{review.content ? review.content : <br></br>}</p>
                <div className='helpful-report-container'>
                    <a>Is this helpful?</a>
                    <button>Report</button>
                </div>
            </div>
        </div>
    )
}

export default UserReview;