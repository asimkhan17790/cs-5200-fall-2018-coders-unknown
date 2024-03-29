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
    static markOrderAsDelivered(orderId) {
        return axios.get(`${API_BASE}/api/restaurant/order/deliver/${orderId}`);
    }
    static deleteAddress(userId,addressId) {
        return axios.get(`${API_BASE}/api/user/${userId}/address/${addressId}/delete`);
    }
    static deletePhone(userId,phoneId) {
        return axios.get(`${API_BASE}/api/user/${userId}/phone/${phoneId}/delete`);
    }
    static updateMyProfile(user) {
        return axios.post(`${API_BASE}/api/user/profile/update`,user);
    }

    // Admin
    static getAllUsers() {
        return axios.get(`${API_BASE}/api/admin/users`);
    }
    static getAllRestaurants() {
        return axios.get(`${API_BASE}/api/restaurant/db/lazy`);
    }
    static getOwnerRestaurants(ownerId) {
        return axios.get(`${API_BASE}/api/user/owner/restaurants/${ownerId}`);
    }
    static getAllApprovals() {
        return axios.get(`${API_BASE}/api/admin/approvals/pending`);
    }
    static deleteUser(userId) {
        return axios.get(`${API_BASE}/api/admin/user/delete/${userId}`);
    }
    static getSelectedUserDetails(userId) {

        return axios.get(`${API_BASE}/api/user/details/${userId}`);
    }

    // menu item CRUD

    static createMenuItem(menuItem, menuId) {

        return axios.post(`${API_BASE}/api/admin/item/create/${menuId}`, menuItem);
    }

    static updateMenuItem(menuItem) {

        return axios.post(`${API_BASE}/api/admin/item/update`, menuItem);
    }
    static deleteMenuItem(menuItemId) {

        return axios.get(`${API_BASE}/api/admin/item/delete/${menuItemId}`);
    }

    static approveOwnership(ownerId, restaurantKey) {

        return axios.get(`${API_BASE}/api/admin/approval/approve/${ownerId}/${restaurantKey}`);
    }

    static rejectOwnership(ownerId, restaurantKey) {

        return axios.get(`${API_BASE}/api/admin/approval/reject/${ownerId}/${restaurantKey}`);
    }

    static deleteRestaurant(restaurantKey) {

        return axios.get(`${API_BASE}/api/admin/restaurant/delete/${restaurantKey}`);
    }

    static requestOwnerShip(ownerId, restaurantKey) {

        return axios.get(`${API_BASE}/api/user/${ownerId}/own/restaurant/${restaurantKey}`);
    }

    static unAssignOwnership(ownerId, restaurantKey) {

        return axios.get(`${API_BASE}/api/user/owner/unassign/${ownerId}/${restaurantKey}`);
    }

    static getUnOwnedRestaurants(ownerId) {

        return axios.get(`${API_BASE}/api/user/restaurants/unowned/${ownerId}`);
    }

    // Followers

    static getIamFollowing(userId) {

        return axios.get(`${API_BASE}/api/user/followings/${userId}`);
    }

    static followCustomer(userId, toBeFollowedId) {

        return axios.get(`${API_BASE}/api/user/follow/${userId}/${toBeFollowedId}`);
    }

    static unfollowCustomer(userId, toBeUnFollowedId) {

        return axios.get(`${API_BASE}/api/user/unfollow/${userId}/${toBeUnFollowedId}`);
    }

    static getMyListOfOrders(userId) {

        return axios.get(`${API_BASE}/api/user/order/${userId}`);
    }
    static adminCreateUser(user) {

        return axios.post(`${API_BASE}/api/admin/user/create`, user);
    }

}

export default UserApi;
