import axios from 'axios';

import {API_BASE} from "../actions/actionTypes";

class UserApi {

    static loginUser(user) {
        return axios.post(`${API_BASE}/api/user/login`, user);
    }
    static getCurrentUser() {
        return axios.get(`${API_BASE}/api/user`,{withCredentials:true});
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
        return axios.get(`${API_BASE}/api/user/restaurants/unmanaged`);
    }
    static getRestaurantsForOwnerSignup() {
        return axios.get(`${API_BASE}/api/restaurant/db/lazy`);
    }

    // Manager page

    static getRestaurantDetailsForManager(managerId) {
        return axios.get(`${API_BASE}/api/user/${managerId}/restaurant`);
    }
    static getPendingOrdersForManager(managerId) {
        return axios.get(`${API_BASE}/api/user/${managerId}/restaurant/orders/pending`);
    }
    static getAllOrdersForManager(managerId) {
        return axios.get(`${API_BASE}/api/user/${managerId}/restaurant/orders`);
    }
    static getAvailableDeliveryBoys() {
        return axios.get(`${API_BASE}/api/user/deliveryBoys`);
    }
    static assignOrderToDeliveryBoy(deliveryBoyId,orderId) {
        return axios.get(`${API_BASE}/api/user/deliveryBoy/${deliveryBoyId}/${orderId}`);
    }
    static getDeliveryBoyAssignedOrders(deliveryBoyId) {
        return axios.get(`${API_BASE}/api/user/deliveryBoy/order/${deliveryBoyId}`);
    }
    static getOrderAssignedToMe(deliveryBoyId) {
        return axios.get(`${API_BASE}/api/user/${deliveryBoyId}/order`);
    }



}

export default UserApi;
