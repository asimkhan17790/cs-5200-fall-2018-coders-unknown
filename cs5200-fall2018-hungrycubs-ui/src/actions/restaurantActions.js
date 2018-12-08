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

export function searchRestaurants(searchQuery) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.searchRestaurants(searchQuery).then(restaurants => {
      dispatch(searchRestaurantsSuccess(restaurants));
    }).catch(error => {
      throw(error);
    });
  };
}



// API CALLS
