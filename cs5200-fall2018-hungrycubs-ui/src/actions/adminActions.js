import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {removeItemFromOrder} from "./restaurantActions";

export function getAllUsersSuccess(user) {
    return {type: types.ADMIN_GET_ALL_USERS_SUCCESS, payload: user};
}

export function getAllUsers() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getAllUsers().then(response => {
            dispatch(getAllUsersSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getAllRestaurantsSUCCESS(user) {
    return {type: types.ADMIN_GET_ALL_RESTAURANTS_SUCCESS, payload: user};
}

export function getAllRestaurants() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getAllRestaurants().then(response => {
            dispatch(getAllRestaurantsSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getOwnersRestaurantsSuccess(user) {
    return {type: types.GET_OWNER_RESTAURANT_SUCCESS, payload: user};
}

export function getOwnersRestaurants(ownerId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getOwnerRestaurants(ownerId).then(response => {
            dispatch(getOwnersRestaurantsSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function getAllApprovalsSuccess(user) {
    return {type: types.ADMIN_GET_PENDING_APPROVALS_SUCCESS, payload: user};
}

export function getAllApprovals() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getAllApprovals().then(response => {
            dispatch(getAllApprovalsSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function deleteUserSuccess(user) {
    return {type: types.ADMIN_DELETE_USER_SUCCESS, payload: user};
}

export function deleteUser(userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.deleteUser(userId).then(response => {
            dispatch(deleteUserSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function getSelectedUserDetailsSUCCESS(user) {
    return {type: types.ADMIN_GET_SELECTED_USER_DETAILS_SUCCESS, payload: user};
}

export function getSelectedUserDetails(userId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getSelectedUserDetails(userId).then(response => {
            dispatch(getSelectedUserDetailsSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function createMenuItemSuccess(item) {
    return {type: types.CREATE_MENU_ITEM_SUCCESS, payload: item};
}

export function createMenuItem(menuItem, menuId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMenuItem(menuItem, menuId).then(response => {
            dispatch(createMenuItemSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function updateMenuItemSuccess(user) {
    return {type: types.UPDATE_MENU_ITEM_SUCCESS, payload: user};
}

export function updateMenuItem(menuItem) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMenuItem(menuItem).then(response => {
            dispatch(updateMenuItemSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function deleteMenuItemSuccess(menuItem) {
    return {type: types.DELETE_MENU_ITEM_SUCCESS, payload: menuItem};
}

export function deleteMenuItem(menuItem) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.deleteMenuItem(menuItem).then(response => {
            dispatch(deleteMenuItemSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function approveOwnershipSuccess(data) {
    return {type: types.APPROVE_OWNERSHIP_SUCCESS, payload: data};
}

export function approveOwnership(ownerId, resKey) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.approveOwnership(ownerId,resKey).then(response => {
            dispatch(approveOwnershipSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function rejectOwnershipSuccess(data) {
    return {type: types.REJECT_OWNERSHIP_SUCCESS, payload: data};
}

export function rejectOwnership(ownerId,resKey) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.rejectOwnership(ownerId,resKey).then(response => {
            dispatch(rejectOwnershipSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function deleteRestaurantSuccess(data) {
    return {type: types.DELETE_RESTAURANT_SUCCESS, payload: data};
}

export function deleteRestaurant(resId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.deleteRestaurant(resId).then(response => {
            dispatch(rejectOwnershipSuccess(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}


export function requestOwnerShipSUCCESS(data) {
    return {type: types.REQUEST_OWNERSHIP_SUCCESS, payload: data};
}

export function requestOwnerShip(ownerId, resKey) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.requestOwnerShip(ownerId,resKey).then(response => {
            dispatch(requestOwnerShipSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}
export function unAssignOwnershipSUCCESS(data) {
    return {type: types.UNASSIGN_OWNERSHIP_SUCCESS, payload: data};
}

export function unAssignOwnership(ownerId,resId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.unAssignOwnership(ownerId,resId).then(response => {
            dispatch(unAssignOwnershipSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function getUnOwnedRestaurantsSUCCESS(data) {
    return {type: types.UNOWNED_RESTAURANT_SUCCESS, payload: data};
}

export function getUnOwnedRestaurants(ownerId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.getUnOwnedRestaurants(ownerId).then(response => {
            dispatch(getUnOwnedRestaurantsSUCCESS(response.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}








// API CALLS
