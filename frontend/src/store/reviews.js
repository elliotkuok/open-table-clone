import csrfFetch from "./csrf";

//CONSTANTS
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const CREATE_REVIEW = "RECEIVE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";

// ACTION CREATORS
export const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    payload: review
})
  
  export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    payload: reviews
})

export const createReview = review => ({
    type: CREATE_REVIEW,
    payload: review
});

export const updateReview = review => ({
    type: UPDATE_REVIEW,
    payload: review
});

export const deleteReview = id => ({
    type: DELETE_REVIEW,
    payload: id
});

// THUNK ACTION CREATORS
export const fetchReviewsByRestaurantId = (restaurantId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/reservations?restaurant_id=${restaurantId}`);
        console.log("res:", res)
        if (res.ok) {
            const reservations = await res.json();
            console.log("reservationsRes:", reservations)

            const reviewIds = [];

            for (const reservationId in reservations) {
                if (reservations.hasOwnProperty(reservationId)) {
                    const reviewId = reservations[reservationId].reviewId;
                    if (reviewId) {
                        reviewIds.push(reviewId);
                    }
                }
            }

            const reviewsRes = await csrfFetch(`/api/reviews?ids=${reviewIds.join(',')}`);

            if (reviewsRes.ok) {
            const reviews = await reviewsRes.json();

            dispatch(receiveReviews(reviews));
            } else {
            console.error('Failed to fetch reviews:', reviewsRes);
            }
        } else {
            console.error('Failed to fetch reservations:', res);
        }
    } catch (error) {
      console.error('Error in fetchReviewsByRestaurantId:', error);
      throw error;
    }
}
  
export const fetchReviews = () => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(receiveReviews(reviews));
    }
}

export const fetchReview = id => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`);
    if (res.ok) {
        const review = await res.json();
        dispatch(receiveReview(review));
    }
}


export const patchReview = (review, reviewId) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });

        if (res.ok) {
            const updatedReview = await res.json();
            dispatch(updateReview(updatedReview));
        } else {
            console.error('Error updating review:', res);
        }
    } catch (error) {
        console.error('Error in patchReview:', error);
        throw error;
    }
}

export const postReview = (review, reservationId) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/reservations/${reservationId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });

        if (res.ok) {
            const newReview = await res.json();
            dispatch(createReview(newReview));
            return newReview;
        } else {
            console.error('Error creating review:', res);
            throw new Error('Failed to create review');
        }
    } catch (error) {
        console.error('Error in postReview:', error);
        throw error;
    }
}

export const destroyReview = reviewId => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(deleteReview(reviewId));
    }
}

// SELECTORS
export const selectAllReviews = state => state.reviews

export const selectReview = function(id) {
    return function(state) {
        return state.reviews[id]
    }
}

// REDUCER
const reviewsReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_REVIEW:
            nextState[action.payload.review.id] = action.payload.review;
            return nextState;
        case RECEIVE_REVIEWS:
            return { ...state, ...action.payload };
        case CREATE_REVIEW:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case UPDATE_REVIEW:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case DELETE_REVIEW:
            delete nextState[action.payload];
            return nextState;
        default:
            return state;
    }
}

export default reviewsReducer;