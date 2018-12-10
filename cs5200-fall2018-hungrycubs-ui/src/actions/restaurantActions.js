import RestaurantApi from '../api/restaurantApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


//
export function searchRestaurantsSuccess(restaurantsList) {
  return {type: types.SEARCH_RESTAURANT_SUCCESS, payload: restaurantsList};
}
/*export function loginSuccess(user) {
  return {type: types.LOGIN_SUCCESS, payload: user};
}

export function signupSuccess(user) {
  return {type: types.SIGNUP_SUCCESS, payload: user};
}*/
export function getMenuSuccess(menuList) {
  return {type: types.GET_MENU_SUCCESS, payload: menuList};
}
export function addItemToOrder(item) {
  return {type: types.ADD_ITEM_TO_ORDER, payload: item};
}
export function removeItemFromOrder(id) {
  return {type: types.REMOVE_ITEM_TO_ORDER, payload: id};
}
export function addCountItemToOrder(item) {
  return {type: types.ADD_COUNT_ITEM_TO_ORDER, payload: item};
}
export function removeCountItemFromOrder(item) {
  return {type: types.REMOVE_COUNT_ITEM_TO_ORDER, payload: item};
}
export function getRestaurantDetailsSuccess(res) {
  return {type: types.GET_RES_DETAILS_SUCCESS, payload: res};
}

//---
export function addItemToOrder1(item) {
  return dispatch => {
    dispatch(addItemToOrder(item));
  };
}
export function removeItemFromOrder1(id) {
  return dispatch => {
    dispatch(removeItemFromOrder(id));
  };
}
export function addCountItemToOrder1(item) {
  return dispatch => {
    dispatch(addCountItemToOrder(item));
  };
}
export function removeCountItemFromOrder1(item) {
  return dispatch => {
    dispatch(removeCountItemFromOrder(item));
  };
}
//---

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

export function getRestaurantDetails(resId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.getRestaurantDetails(resId).then(response => {
      console.log(response.data);
      dispatch(getRestaurantDetailsSuccess(response.data));
    }).catch(error => {
      throw(error);
    });
  };
}




// API CALLS
