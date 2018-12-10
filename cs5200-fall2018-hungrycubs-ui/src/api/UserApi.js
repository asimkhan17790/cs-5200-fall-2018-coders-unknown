import axios from 'axios';

const API_BASE = `http://localhost:8080`;

class UserApi {

    static loginUser(user) {
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


}

export default UserApi;
