import axios from 'axios';

import {API_BASE} from "../actions/actionTypes";


class RestaurantApi {

  static searchRestaurants(searchQuery) {
    return axios.post(`${API_BASE}/api/restaurant/search`, {
      search:searchQuery
    });
  }

  static getMenuForRestaurant(resId) {
    return axios.get(`${API_BASE}/api/restaurant/db/${resId}`);
  }
  static getRestaurantDetails(resId) {
    return axios.get(`${API_BASE}/api/restaurant/${resId}`);
  }

  static placeOrder(addressId, phoneId, order) {
    return axios.post(`${API_BASE}/api/restaurant/order/${order.restaurantKey}/${order.customerId}/${addressId}/${phoneId}`, order);
  }
  static getOrderDetailsByOrderId(orderId) {
    return axios.get(`${API_BASE}/api/restaurant/order/${orderId}`);
  }


}

export default RestaurantApi;
