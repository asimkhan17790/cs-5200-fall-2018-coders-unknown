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
        case types.REMOVE_ITEM_TO_ORDER:
            const index = state.order.items.findIndex(item=> item.id===action.payload);
            return {...state, order:{...state.order,items:[...state.order.items.slice(0,index),...state.order.items.slice(index+1,state.order.items.length)]}};
        case types.ADD_COUNT_ITEM_TO_ORDER:
            let item = state.order.items.find(item=> item.id===action.payload);
            let index2 = state.order.items.findIndex(item=> item.id===action.payload);
            let newItem = {...item, quantity:item.quantity+1};
            return {...state, order:{...state.order,items:[...state.order.items.slice(0,index2),newItem,...state.order.items.slice(index2+1,state.order.items.length)]}};
        case types.REMOVE_COUNT_ITEM_TO_ORDER:
            let item1 = state.order.items.find(item=> item.id===action.payload);
            let index1 = state.order.items.findIndex(item=> item.id===action.payload);
            let newItem1 = {...item1, quantity:item1.quantity-1};
            return {...state, order:{...state.order,items:[...state.order.items.slice(0,index1),newItem1,...state.order.items.slice(index1+1,state.order.items.length)]}};
        case types.CLEAR_CURRENT_ORDER:
            return {...state, order:{}};
        default:
            return state;
    }
}
