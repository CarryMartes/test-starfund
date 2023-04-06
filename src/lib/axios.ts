import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
} as any;

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error;
});

export default axiosClient;