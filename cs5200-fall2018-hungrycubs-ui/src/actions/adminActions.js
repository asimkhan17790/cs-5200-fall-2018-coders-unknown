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




// API CALLS
