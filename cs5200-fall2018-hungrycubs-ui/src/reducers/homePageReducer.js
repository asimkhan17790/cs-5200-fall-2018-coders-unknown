import * as types from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function homePageReducer(state = initialState.homePage, action) {
  switch (action.type) {
    case types.SEARCH_RESTAURANT_SUCCESS:
      return Object.assign({}, state,{ searchedRestaurants: action.payload });
        /*return [...state, {
          searchedRestaurants: action.payload
        }];*/
    default:
      return state;
  }
}
