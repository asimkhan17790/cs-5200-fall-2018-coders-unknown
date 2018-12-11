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

    case types.CLEAR_SEARCH_RESTAURANT_RESULT:
      return {...state,searchedRestaurants:[]};
    case types.GET_RESTAURANT_DETAILS_FOR_MANAGER_SUCCESS:
      return {...state,restaurantDetails:action.payload};
    case types.GET_PENDING_ORDERS_FOR_MANAGER_SUCCESS:
      return {...state,pendingManagerOrders:action.payload};
    case types.GET_ALL_ORDERS_FOR_MANAGER_SUCCESS:
      return {...state,allManagerOrders:action.payload};
    case types.GET_AVAILABLE_DELIVERY_BOYS_SUCCESS:
      return {...state,deliveryBoysList:action.payload};
    case types.ASSIGN_ORDER_TO_DELIVERY_BOY_SUCCESS:
      return state;
    case types.GET_ORDER_DETAILS_BY_ID_SUCCESS:
      return {...state,customerOrderItemDetails:action.payload};
    case types.GET_DELIVERY_BOY_ASSIGNED_ORDER_SUCCESS:
      return {...state,allDeliveryBoyOrders:action.payload};
    case types.GET_ORDERED_ASSIGNED_TO_ME_SUCCESS:
      return {...state,myAssignedOrder:action.payload};
    case types.ADMIN_GET_PENDING_APPROVALS_SUCCESS:
      return {...state,allApprovals:action.payload};
    case types.ADMIN_GET_ALL_RESTAURANTS_SUCCESS:
      return {...state,allRestaurants:action.payload};
    case types.ADMIN_GET_ALL_USERS_SUCCESS:
      return {...state,allUsers:action.payload};

    default:
      return state;
  }
}
