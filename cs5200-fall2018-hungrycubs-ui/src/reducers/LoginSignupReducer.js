import * as types from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function currentUser(state = initialState.currentUser, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.payload;
    case types.SIGNUP_SUCCESS:
      return action.payload;
    case types.CREATE_ADDRESS_SUCCESS:
      return action.payload;
    case types.CREATE_PHONE_SUCCESS:
      return action.payload;
    case types.UPDATE_ADDRESS_SUCCESS:
      return action.payload;
    case types.UPDATE_PHONE_SUCCESS:
      return action.payload;
    case types.DELETE_PHONE_SUCCESS:
      return action.payload;
    case types.DELETE_ADDRESS_SUCCESS:
      return action.payload;
    case types.LOGOUT_SUCCESS:
      return initialState.currentUser;
    case types.GET_CURRENT_USER_SUCCESS:
      return action.payload;
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return action.payload;
    case types.CLEAR_CURRENT_USER:
      return {id:0,
        firstName:'',
        lastName:'',
        username:'',
        password:'',
        dType:'CR',
        addresses:[],
        phones:[]};

    default:
      return state;
  }
}
