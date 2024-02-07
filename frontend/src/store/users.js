import csrfFetch from "./csrf";

//CONSTANTS
export const RECEIVE_USER = "RECEIVE_USER";
export const STORE_USER = "STORE_USER";

// ACTION CREATORS
export const storeUser = user => ({
    type: STORE_USER,
    payload: user
});


// THUNK ACTION CREATORS

export const fetchUser = id => async dispatch => {
    const res = await csrfFetch(`/api/users/${id}`);
    if (res.ok) {
      const user = await res.json();
      dispatch(storeUser(user));
    }
};

// SELECTORS
export const selectUser = function(id) {
    return function(state) {
      return state.users[id]
    }
}

// REDUCER
const usersReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case STORE_USER:
            if (action.payload) {
                nextState[action.payload?.user?.id] = action.payload.user;
            }
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;
