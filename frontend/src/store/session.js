import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user)=> ({
    type: SET_CURRENT_USER,
    payload: user
});

const removeCurrentUser = ()=> ({
    type: REMOVE_CURRENT_USER
});

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const login = ({email, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
    // if (res.ok) {
    //     const user = await res.json();
    //     dispatch(setCurrentUser(user));
    //     return user;
    // }
};

const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return { ...state, user: action.payload };
      case REMOVE_CURRENT_USER:
        return { ...state, user: null };
      default:
        return state;
    }
};
  
export default sessionReducer;