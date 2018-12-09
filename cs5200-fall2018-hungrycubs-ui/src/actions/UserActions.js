import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


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

export function createMyPhoneSuccess(user) {
    return {type: types.CREATE_PHONE_SUCCESS, payload: user};
}

export function updateMyPhoneSuccess(user) {
    return {type: types.UPDATE_PHONE_SUCCESS, payload: user};
}
export function loginUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.loginUser(user).then(response => {
            console.log(response);
            dispatch(loginSuccess(response.data));
        }).catch(error => {
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
            throw(error);
        });
    };
}

export function signUpUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.signUpUser(user).then(response => {
            console.log(response);
            dispatch(signupSuccess(response.data));
        }).catch(error => {
            throw(error);
        });
    };
}
export function createMyAddress(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyAddress(user).then(response => {
            console.log(response);
            dispatch(createMyAddressSuccess(response.data));
        }).catch(error => {
            throw(error);
        });
    };
}
export function updateMyAddress(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyAddress(user).then(response => {
            console.log(response);
            dispatch(updateMyAddressSuccess(response.data));
        }).catch(error => {
            throw(error);
        });
    };
}
export function createMyPhone(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.createMyPhone(user).then(response => {
            console.log(response);
            dispatch(createMyPhoneSuccess(response.data));
        }).catch(error => {
            throw(error);
        });
    };
}
export function updateMyPhone(user) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.updateMyPhone(user).then(response => {
            console.log(response);
            dispatch(updateMyPhoneSuccess(response.data));
        }).catch(error => {
            throw(error);
        });
    };
}




// API CALLS
