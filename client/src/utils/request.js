import axios from 'axios';

import store from '@store';

import { setLogout, setToken } from '@containers/Client/actions';
import { refresh } from '@domain/api';

axios.interceptors.request.use((reqConfig) => {
  const state = store.getState();
  const { token } = state.client;
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { dispatch } = store;
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      // eslint-disable-next-line no-underscore-dangle
      // originalRequest._retry = true;
      const response = await refresh();
      if (response?.token) {
        dispatch(setToken(response?.token));
        originalRequest.headers.Authorization = `Bearer ${response?.token}`;
        return axios.request(originalRequest);
      }
    }
    if (error.response?.status === 403) {
      window.location.href('/');
    }
    if (error.response?.status === 406) {
      dispatch(setLogout());
    }
    return Promise.reject(error);
  }
);

const request = (options) => axios(options);

export default request;
