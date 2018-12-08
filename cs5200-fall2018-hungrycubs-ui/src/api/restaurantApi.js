import axios from 'axios';

const API_BASE = `http://localhost:8080`;

class RestaurantApi {

  static searchRestaurants(searchQuery) {
    return axios.post(`${API_BASE}/api/restaurant/search`, {
      search:searchQuery
    });
  }

  static getMenuForRestaurant(resId) {
    return axios.get(`${API_BASE}/api/user/restaurant/db/${resId}`);
  }

}

export default RestaurantApi;
