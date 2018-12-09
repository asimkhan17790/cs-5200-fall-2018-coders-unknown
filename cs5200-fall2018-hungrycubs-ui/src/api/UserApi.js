import axios from 'axios';

import {API_BASE} from "../actions/actionTypes";

class UserApi {

    static loginUser(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password
        });
    }

    static logoutUser(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password
        });
    }
    static signUpUser(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            dType:user.dType
        });
    }

    static createMyAddress(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            dType:user.dType
        });
    }
    static updateMyAddress(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            dType:user.dType
        });
    }

    static createMyPhone(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            dType:user.dType
        });
    }

    static updateMyPhone(user) {
        return axios.post(`${API_BASE}/api/restaurant/search`, {
            username:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            dType:user.dType
        });
    }
}

export default UserApi;
