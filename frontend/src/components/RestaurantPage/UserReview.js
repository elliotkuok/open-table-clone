const UserReview = () => {

    return (
        <div className='rst-user-review-container'>
            <div className='rst-user-profile'>
                <button id="profile-button">
                    <span style={{ marginTop: '4px', marginLeft: '2px'}}>
                    DU
                    </span>
                </button>
                <p>Name</p>
                <p>Location</p>
                <p># of reviews</p>
            </div>
            <div className='rst-user-review'>
                <div className='rating-date-container'>
                    <span>★★★★★</span>
                    <p>Dined on (insert date)</p>
                </div>
                <div className='rating-breakdown-container'>
                    <p>Overall <span>#</span></p>
                    <p>Food <span>#</span></p>
                    <p>Service <span>#</span></p>
                    <p>Ambience <span>#</span></p>
                    <p>Value <span>#</span></p>
                </div>
                <p>I had a great time</p>
                <div className='helpful-report-container'>
                    <a>Is this helpful?</a>
                    <button>Report</button>
                </div>
            </div>
        </div>
    )
}

export default UserReview;