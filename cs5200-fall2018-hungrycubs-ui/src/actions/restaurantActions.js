import RestaurantApi from '../api/restaurantApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


//
export function searchRestaurantsSuccess(restaurantsList) {
  return {type: types.SEARCH_RESTAURANT_SUCCESS, payload: restaurantsList};
}
export function loginSuccess(user) {
  return {type: types.LOGIN_SUCCESS, payload: user};
}

export function signupSuccess(user) {
  return {type: types.SIGNUP_SUCCESS, payload: user};
}
export function getMenuSuccess(menuList) {
  return {type: types.GET_MENU_SUCCESS, payload: menuList};
}
export function addItemToOrder(user) {
  return {type: types.ADD_ITEM_TO_ORDER, payload: user};
}
export function removeItemFromOrder(user) {
  return {type: types.REMOVE_ITEM_TO_ORDER, payload: user};
}
export function addCountItemToOrder(user) {
  return {type: types.ADD_COUNT_ITEM_TO_ORDER, payload: user};
}
export function removeCountItemFromOrder(user) {
  return {type: types.REMOVE_COUNT_ITEM_TO_ORDER, payload: user};
}

export function searchRestaurants(searchQuery) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.searchRestaurants(searchQuery).then(response => {
      console.log(response);
      dispatch(searchRestaurantsSuccess(response.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function getMenuForRestaurant(resId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.getMenuForRestaurant(resId).then(response => {
      console.log(response.data);
      dispatch(getMenuSuccess(response.data));
    }).catch(error => {
      throw(error);
    });
  };
}




// API CALLS
