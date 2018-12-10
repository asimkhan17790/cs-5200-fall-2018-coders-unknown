import axios from 'axios';

import {API_BASE} from "../actions/actionTypes";

class UserApi {

    static loginUser(user) {
        return axios.post(`${API_BASE}/api/user/login`, user);
    }
    static getCurrentUser() {
        return axios.get(`${API_BASE}/api/user`);
    }

    static logoutUser(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password
        });
    }
    static signUpUser(user) {
        return axios.post(`${API_BASE}/api/user/register`, user);
    }

    static createMyAddress(address, userId) {
        return axios.post(`${API_BASE}/api/user/${userId}/address/create`, address);
    }
    static updateMyAddress(address,userId) {
        return axios.post(`${API_BASE}/api/user/${userId}/address/update`, address);
    }

    static createMyPhone(phone,userId) {
        return axios.post(`${API_BASE}/api/user/${userId}/phone/create`, phone);
    }

    static updateMyPhone(phone,userId) {
        return axios.post(`${API_BASE}/api/user/${userId}/phone/update`, phone);
    }
    static getRestaurantsForManagerSignup() {
        return axios.get(`${API_BASE}/api/restaurant/db`);
    }
    static getRestaurantsForOwnerSignup() {
        return axios.get(`${API_BASE}/api/restaurant/db`);
    }


}

export default UserApi;
