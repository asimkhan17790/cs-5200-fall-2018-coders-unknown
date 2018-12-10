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
export function addPriceToTotalPrice(price) {
  return {type: types.ADD_PRICE_TO_TOTAL_PRICE, payload: price};
}
export function getRestaurantDetailsSuccess(res) {
  return {type: types.GET_RES_DETAILS_SUCCESS, payload: res};
}
export function clearSearchedRestaurants1(res) {
  return {type: types.CLEAR_SEARCH_RESTAURANT_RESULT, payload: {}};
}
export function clearCurrentOrder(res) {
  return {type: types.CLEAR_CURRENT_ORDER, payload: {}};
}
export function clearSearchedRestaurants() {
  return dispatch => {
    dispatch(clearSearchedRestaurants1({}));
  };
}
export function getOrderDetailsByOrderIdSuccess(payload) {
  return {type: types.GET_ORDER_DETAILS_BY_ID_SUCCESS, payload: payload};
}
export function getOrderDetailsByOrderId(orderId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.getOrderDetailsByOrderId(orderId).then(response => {
      console.log(response.data);
      dispatch(getOrderDetailsByOrderIdSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

//---
export function addItemToOrder1(item) {
  return dispatch => {
    dispatch(addItemToOrder(item));
    dispatch(addPriceToTotalPrice(item.item.basePrice));
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
    //dispatch(addPriceToTotalPrice(item.item.basePrice));
  };
}
export function removeCountItemFromOrder1(item) {
  return dispatch => {
    dispatch(removeCountItemFromOrder(item));
    //dispatch(addPriceToTotalPrice(-1*item.item.basePrice));
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
      dispatch(ajaxCallError());
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
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}


//TODO
export function getRestaurantDetails(resId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.getRestaurantDetails(resId).then(response => {
      console.log(response.data);
      dispatch(getRestaurantDetailsSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

//TODO

export function placeOrderSuccess(res) {
  return {type: types.PLACE_ORDER_SUCCESS, payload: {}};
}
export function placeOrder(addressId, phoneId, order) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RestaurantApi.placeOrder(addressId, phoneId, order).then(response => {
      console.log(response.data);
      dispatch(placeOrderSuccess(response.data));
      dispatch(clearCurrentOrder(response.data));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}



// API CALLS
