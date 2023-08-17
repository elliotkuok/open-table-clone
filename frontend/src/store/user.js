import * as userApiUtils from '../utils/userApiUtils'
import { receiveCreateUserErrors } from './errorsReducer';

// CONSTANTS
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const REMOVE_USER = 'REMOVE_USER'

// ACTION CREATORS
export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user
})
  
  // be careful - Users parameter could be an array or object
  export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    payload: users
})
  
  export const removeUser = userId => ({
    type: REMOVE_USER,
    payload: userId
})

// THUNK ACTION CREATORS
export const fetchUsers = () => async (dispatch, getState) => {
    const users = await userApiUtils.fetchAllUsers()
    return dispatch(receiveUsers(users))
}

export const fetchUser = userId => (dispatch, getState) => (
    userApiUtils.fetchUser(userId)
        .then(data => (
        dispatch(receiveUser(data))
        )
    )
)

export const createUser = userData => async dispatch => {
    try {
        const user = await userApiUtils.createUser(userData)
        return dispatch(receiveUser({user}))
    } catch (errors){
        dispatch(receiveCreateUserErrors(errors))
    }
}

// SELECTORS
export const selectAllUsers = state => state.entities.users

// REDUCER
const userReducer = (state = {}, action) => {
    const nextState = { ...state }
    // const nextState = Object.assign({}, state)
  
    switch (action.type) {
      case RECEIVE_USER:
        nextState[action.payload.user.id] = action.payload.user
        return nextState
      case RECEIVE_USERS:
        return Object.assign(nextState, action.payload)
      case REMOVE_USER:
        delete nextState[action.payload]
        return nextState
      default:
        return state
    }
  }
  
  export default userReducer;