import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loginSuccess(user) {
    return {type: types.LOGIN_SUCCESS, payload: user};
}

export function signupSuccess(user) {
    return {type: types.SIGNUP_SUCCESS, payload: user};
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




// API CALLS
