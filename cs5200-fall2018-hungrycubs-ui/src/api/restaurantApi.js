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
    return axios.get(`${API_BASE}/api/restaurant/details/${resId}`);
  }

  static placeOrder(searchQuery) {
    return axios.post(`${API_BASE}/api/restaurant/search`, {
      search:searchQuery
    });
  }


}

export default RestaurantApi;
