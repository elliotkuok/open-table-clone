import csrfFetch from "./csrf";

//CONSTANTS
export const RECEIVE_RESTAURANT = "RECEIVE_RESTAURANT";
export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";

// ACTION CREATORS
export const receiveRestaurant = restaurant => ({
    type: RECEIVE_RESTAURANT,
    payload: restaurant
})
  
  export const receiveRestaurants = restaurants => ({
    type: RECEIVE_RESTAURANTS,
    payload: restaurants
})

// THUNK ACTION CREATORS
export const fetchRestaurants = () => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants`);
    if (res.ok) {
        const restaurants = await res.json();
        dispatch(receiveRestaurants(restaurants));
    }
}

export const fetchRestaurant = id => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${id}`);
    if (res.ok) {
        const restaurant = await res.json();
        dispatch(receiveRestaurant(restaurant));
    }
}

// SELECTORS
export const selectAllRestaurants = state => state.restaurants

export const selectRestaurant = function(id) {
    return function(state) {
      return Object.values(state.restaurants).find(r => r.id.toString() === id)
    }
  }


// REDUCER
const restaurantsReducer = (state = {}, action) => {
    console.log("Reducer: Action type:", action.type);
    console.log("Reducer: Action payload:", action.payload);
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_RESTAURANT:
            nextState[action.payload.restaurant.id] = action.payload.restaurant;
            return nextState;
        case RECEIVE_RESTAURANTS:
            return Object.assign(nextState, action.payload);    
        default:
            return state;
    }
}

export default restaurantsReducer;
