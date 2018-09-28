import axios from 'axios';
import config from '../config';
import nprogress from 'nprogress';

export const http = axios.create({ baseURL: config.BASE_URL });

http.interceptors.request.use(config => {
	nprogress.start();
	return config;
});

http.interceptors.response.use(resp => {
	nprogress.done();
	return resp.data;
}, err => {
	nprogress.done();
    return Promise.reject(err);
});
