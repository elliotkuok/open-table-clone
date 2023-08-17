const RECEIVE_CREATE_USER_ERRORS = 'RECEIVE_CREATE_USER_ERRORS'

export const receiveCreateUserErrors = errors => ({
  type: RECEIVE_CREATE_USER_ERRORS,
  payload: errors
})

const defaultState = {
  createUser: [],
  session: []
}

const errorsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_CREATE_USER_ERRORS:
      return { ...state, createUser: action.payload }
    default:
      return state
  }
}

export default errorsReducer