import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {removeItemFromOrder} from "./restaurantActions";


export function loginSuccess(user) {
    return {type: types.LOGIN_SUCCESS, payload: user};
}

export function logoutSuccess(user) {
    return {type: types.LOGOUT_SUCCESS, payload: user};
}

export function signupSuccess(user) {
    return {type: types.SIGNUP_SUCCESS, payload: user};
}

export function createMyAddressSuccess(user) {
    return {type: types.CREATE_ADDRESS_SUCCESS, payload: user};
}

export function updateMyAddressSuccess(user) {
    return {type: types.UPDATE_ADDRESS_SUCCESS, payload: user};
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
        dispatch(beginAjaxCall());
        return UserApi.logoutUser(user).then(response => {
            dispatch(logoutUser({id:0}));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
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
export function createMyAddress(address, userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyAddress(address, userId).then(response => {
            console.log(response);
            dispatch(createMyAddressSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function updateMyAddress(address,userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyAddress(address,userId).then(response => {
            console.log(response);
            dispatch(updateMyAddressSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function createMyPhone(phone,userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyPhone(phone,userId).then(response => {
            console.log(response);
            dispatch(createMyPhoneSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function updateMyPhone(phone, userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyPhone(phone, userId).then(response => {
            console.log(response);
            dispatch(updateMyPhoneSuccess(response.data));
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




// API CALLS
