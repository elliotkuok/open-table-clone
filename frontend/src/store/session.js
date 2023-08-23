import csrfFetch from "./csrf";
import { receiveCreateUserErrors } from './errorsReducer';
import { storeUser } from "./reservations";

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user)=> ({
    type: SET_CURRENT_USER,
    payload: user
});

const removeCurrentUser = ()=> ({
    type: REMOVE_CURRENT_USER
});


const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const signup = (user) => async (dispatch) => {
    const { email, password, firstName, lastName, phoneNumber } = user;
    try {const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      })
    })
    if (response.ok) {
      const data = await response.json();
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
      return data;
    } else {
      throw response
    }
    } catch (response) {
      let data = await response.json();
      dispatch(receiveCreateUserErrors(data.errors))
    }
  };

export const login = ({email, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(storeUser(data.user)); // Store user info in reservations slice
    return res;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch("/api/session");
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(storeUser(data.user)); // Store user info in reservations slice
    return res;
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