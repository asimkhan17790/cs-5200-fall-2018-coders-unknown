import * as types from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function menuPageReducer(state = initialState.menuPage, action) {
    switch (action.type) {
        case types.GET_MENU_SUCCESS:
            return Object.assign({}, state,{ menuItems: action.payload });
        /*return [...state, {
          searchedRestaurants: action.payload
        }];*/
        case types.ADD_ITEM_TO_ORDER:
           return {...state, order:{...state.order,customerId:action.payload.customerId,restaurantKey:action.payload.restaurantKey, items:[...state.order.items,action.payload.item]}};
        default:
            return state;
    }
}
