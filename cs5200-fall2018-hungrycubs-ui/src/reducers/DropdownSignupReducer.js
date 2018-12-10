import * as types from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function DropdownSignupReducer(state = initialState.dropdowns, action) {
    switch (action.type) {
        case types.GET_SIGNUP_RESTAURANT_LIST_FOR_OWNER_SUCCESS:
            return Object.assign({}, state,{ ownerSignupDropdown: action.payload });
        case types.GET_SIGNUP_RESTAURANT_LIST_FOR_MANAGER_SUCCESS:
            return Object.assign({}, state,{ managerSignupDropdown: action.payload });
        default:
            return state;
    }
}
