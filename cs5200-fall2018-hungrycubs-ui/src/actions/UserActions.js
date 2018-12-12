import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {removeItemFromOrder} from "./restaurantActions";


export function loginSuccess(user) {
    return {type: types.LOGIN_SUCCESS, payload: user};
}

export function logoutSuccess() {
    return {type: types.LOGOUT_SUCCESS, payload: {}};
}

export function signupSuccess(user) {
    return {type: types.SIGNUP_SUCCESS, payload: user};
}

export function createMyAddressSuccess(user) {
    return {type: types.CREATE_ADDRESS_SUCCESS, payload: user};
}
export function createUsersAddressSuccess(user) {
    return {type: types.ADMIN_CREATE_USER_ADDRESS_SUCCESS, payload: user};
}

export function updateMyAddressSuccess(user) {
    return {type: types.UPDATE_ADDRESS_SUCCESS, payload: user};
}
export function updateUsersAddressSuccess(user) {
    return {type: types.ADMIN_UPDATE_USER_ADDRESS_SUCCESS, payload: user};
}
export function clearCurrentUser1() {
    return {type: types.CLEAR_CURRENT_USER, payload: {}};
}

export function clearCurrentUser() {
    return dispatch => {
        dispatch(clearCurrentUser1());
    };
}
export function createMyPhoneSuccess(user) {
    return {type: types.CREATE_PHONE_SUCCESS, payload: user};
}
export function createUsersPhoneSuccess(user) {
    return {type: types.ADMIN_CREATE_USER_PHONE_SUCCESS, payload: user};
}


export function getCurrentUserSuccess() {
    return {type: types.GET_CURRENT_USER_SUCCESS, payload: {}};
}
export function getCurrentUser() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getCurrentUser().then(response => {

            if (!response.data) {
                dispatch(ajaxCallError());
                throw("Session Not Found!! Please login");
            }
            dispatch(getCurrentUserSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function updateMyPhoneSuccess(user) {
    return {type: types.UPDATE_PHONE_SUCCESS, payload: user};
}
export function updateUsersPhoneSuccess(user) {
    return {type: types.ADMIN_UPDATE_USER_PHONE_SUCCESS, payload: user};
}

export function loginUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.loginUser(user).then(response => {
            console.log(response);
            if (response.data.id === 0) {
                dispatch(ajaxCallError());
                throw("Username or password invalid! Please try again...");
            }
            dispatch(loginSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function logoutUser(user) {
    return dispatch => {
       // dispatch(beginAjaxCall());
        dispatch(logoutSuccess());
        /*return UserApi.logoutUser(user).then(response => {
            dispatch(logoutUser({id:0}));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });*/
    };
}

export function signUpUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.signUpUser(user).then(response => {
            if (response.data.id === 0){
                dispatch(ajaxCallError());
                throw('Sign up Failure! Please enter correct details...');
            }
            dispatch(signupSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function createMyAddress(address, userId, adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyAddress(address, userId).then(response => {

            if (adminId && adminId!==0){
                console.log('Adminc Address creations');
                dispatch(createUsersAddressSuccess(response.data));
            }else {
                dispatch(createMyAddressSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function updateMyAddress(address,userId,adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyAddress(address,userId).then(response => {
            console.log(response);
            if (adminId && adminId!==0) {
                dispatch(updateUsersAddressSuccess(response.data));
            }else {
                dispatch(updateMyAddressSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function createMyPhone(phone,userId, adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyPhone(phone,userId).then(response => {
            console.log(response);
            if (adminId && adminId!==0) {
                dispatch(createUsersPhoneSuccess(response.data));
            }else {
                dispatch(createMyPhoneSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function updateMyPhone(phone, userId, adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyPhone(phone, userId).then(response => {
            if (adminId && adminId!==0) {
                dispatch(updateUsersPhoneSuccess(response.data));
            }else {
                dispatch(updateMyPhoneSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function getRestaurantsForManagerSignupSuccess(user) {
    return {type: types.GET_SIGNUP_RESTAURANT_LIST_FOR_MANAGER_SUCCESS, payload: user};
}
export function getRestaurantsForOwnerSignupSuccess(user) {
    return {type: types.GET_SIGNUP_RESTAURANT_LIST_FOR_OWNER_SUCCESS, payload: user};
}

export function getRestaurantsForManagerSignup() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getRestaurantsForManagerSignup().then(response => {
            dispatch(getRestaurantsForManagerSignupSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getRestaurantsForOwnerSignup() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getRestaurantsForOwnerSignup().then(response => {
            dispatch(getRestaurantsForOwnerSignupSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
// --- MANAGER PAGE


export function getRestaurantDetailsForManagerSuccess(user) {
    return {type: types.GET_RESTAURANT_DETAILS_FOR_MANAGER_SUCCESS, payload: user};
}
export function getRestaurantDetailsForManager(managerId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getRestaurantDetailsForManager(managerId).then(response => {
            dispatch(getRestaurantDetailsForManagerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getPendingOrdersForManagerSuccess(user) {
    return {type: types.GET_PENDING_ORDERS_FOR_MANAGER_SUCCESS, payload: user};
}
export function getPendingOrdersForManager(managerId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getPendingOrdersForManager(managerId).then(response => {
            dispatch(getPendingOrdersForManagerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getAllOrdersForManagerSuccess(user) {
    return {type: types.GET_ALL_ORDERS_FOR_MANAGER_SUCCESS, payload: user};
}
export function getAllOrdersForManager(managerId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getAllOrdersForManager(managerId).then(response => {
            dispatch(getAllOrdersForManagerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getAvailableDeliveryBoysSuccess(user) {
    return {type: types.GET_AVAILABLE_DELIVERY_BOYS_SUCCESS, payload: user};
}

export function getAvailableDeliveryBoys() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getAvailableDeliveryBoys().then(response => {
            dispatch(getAvailableDeliveryBoysSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function assignOrderToDeliveryBoySuccess(user) {
    return {type: types.ASSIGN_ORDER_TO_DELIVERY_BOY_SUCCESS, payload: user};
}
export function assignOrderToDeliveryBoy(deliveryBoyId,orderId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.assignOrderToDeliveryBoy(deliveryBoyId,orderId).then(response => {
            dispatch(assignOrderToDeliveryBoySuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function markOrderAsDeliveredSuccess() {
    return {type: types.MARK_ORDER_AS_DELIVERED_SUCCESS, payload: {}};
}

export function markOrderAsDelivered(orderId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.markOrderAsDelivered(orderId).then(response => {
            dispatch(markOrderAsDeliveredSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function getDeliveryBoyAssignedOrderSUCCESS(payload) {
    return {type: types.GET_DELIVERY_BOY_ASSIGNED_ORDER_SUCCESS, payload: payload};
}
export function getDeliveryBoyAssignedOrders(id) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getDeliveryBoyAssignedOrders(id).then(response => {
            dispatch(getDeliveryBoyAssignedOrderSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getOrderAssignedToMeSuccess(orderObject) {
    return {type: types.GET_ORDERED_ASSIGNED_TO_ME_SUCCESS, payload: orderObject};
}
export function getOrderAssignedToMe(id) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getOrderAssignedToMe(id).then(response => {
            dispatch(getOrderAssignedToMeSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function deleteAddressSuccess(data) {
    return {type: types.DELETE_ADDRESS_SUCCESS, payload: data};
}
export function deleteUsersAddressSuccess(data) {
    return {type: types.ADMIN_DELETE_USER_ADDRESS_SUCCESS, payload: data};
}
export function deleteAddress(userId,addressId, adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.deleteAddress(userId,addressId).then(response => {

             if (adminId && adminId!==0) {
                 dispatch(deleteUsersAddressSuccess(response.data));
             }else {
                 dispatch(deleteAddressSuccess(response.data));
             }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function deletePhoneSuccess(data) {
    return {type: types.DELETE_PHONE_SUCCESS, payload: data};
}
export function deleteUsersPhoneSuccess(data) {
    return {type: types.ADMIN_DELETE_USER_PHONE_SUCCESS, payload: data};
}
export function deletePhone(userId,phoneId,adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.deletePhone(userId,phoneId).then(response => {

            if (adminId && adminId!==0) {
                dispatch(deleteUsersPhoneSuccess(response.data));
            }else {
                dispatch(deletePhoneSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function updateMyProfileSuccess(data) {
    return {type: types.UPDATE_USER_PROFILE_SUCCESS, payload: data};
}
export function updateUsersProfileSuccess(data) {
    return {type: types.ADMIN_UPDATE_USER_PROFILE_SUCCESS, payload: data};
}
export function updateMyProfile(user, adminId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        const updatedUser = {
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            username:user.username,
            password:user.password
        };
        return UserApi.updateMyProfile(updatedUser).then(response => {
            if (adminId && adminId!==0) {
                dispatch(updateUsersProfileSuccess(response.data));
            }else {
                dispatch(updateMyProfileSuccess(response.data));
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

// Followers

export function getIamFollowingSuccess(data) {
    return {type: types.GET_I_AM_FOLLOWING_SUCCESS, payload: data};
}
export function getIamFollowing(userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getIamFollowing(userId).then(response => {
            dispatch(getIamFollowingSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function followCustomerSuccess(user) {
    return {type: types.FOLLOW_CUSTOMER_SUCCESS, payload: user};
}
export function followCustomer(userId, toBeFollowedId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.followCustomer(userId, toBeFollowedId).then(response => {
            dispatch(followCustomerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function unfollowCustomerSuccess(user) {
    return {type: types.UNFOLLOW_CUSTOMER_SUCCESS, payload: user};
}
export function unfollowCustomer(userId, toBeUnFollowedId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.unfollowCustomer(userId, toBeUnFollowedId).then(response => {
            dispatch(unfollowCustomerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function getMyListOfOrdersSuccess(orderList) {
    return {type: types.GET_MY_LIST_OF_ORDERS_SUCCESS, payload: orderList};
}
export function getMyListOfOrders(userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getMyListOfOrders(userId).then(response => {
            dispatch(unfollowCustomerSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}



// API CALLS
