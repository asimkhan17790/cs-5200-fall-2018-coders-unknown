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
    case types.ADMIN_GET_SELECTED_USER_DETAILS_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_CREATE_USER_ADDRESS_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_UPDATE_USER_ADDRESS_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_DELETE_USER_ADDRESS_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_CREATE_USER_PHONE_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_UPDATE_USER_PHONE_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_DELETE_USER_PHONE_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.ADMIN_UPDATE_USER_PROFILE_SUCCESS:
      return {...state,userSelected:action.payload};
    case types.GET_OWNER_RESTAURANT_SUCCESS:
      return {...state,ownerRestaurants:action.payload};
    case types.UNOWNED_RESTAURANT_SUCCESS:
      return {...state,unownedRestaurants:action.payload};
    case types.GET_I_AM_FOLLOWING_SUCCESS:
      return {...state,iamFollowingList:action.payload};
    case types.GET_MY_LIST_OF_ORDERS_SUCCESS:
      return {...state,myOrderHistoryList:action.payload};


    default:
      return state;
  }
}
