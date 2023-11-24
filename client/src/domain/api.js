import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  artist: 'artist',
  admin: 'admin',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}, iswithCredentials = false) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
    withCredentials: iswithCredentials,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const refresh = () => callAPI('refresh', 'get', {}, {}, {}, true);

export const validateLogin = (data) => callAPI('login', 'post', {}, {}, data, true);
export const sendEmailForgotPassword = (data) => callAPI('forgot-password', 'post', {}, {}, data);
export const sendResetPasswordApi = (data) => callAPI('set-reset-password', 'post', {}, {}, data);
export const sendEmailOtp = (data) => callAPI('verify-email', 'post', {}, {}, data, true);
export const sendOTPApi = (data) => callAPI('set-verify-email', 'patch', {}, {}, data, true);
export const register = (data) => callAPI('register', 'post', {}, {}, data);
export const editProfileAPI = (data) => callAPI('edit-profile', 'put', {}, {}, data, true);

export const addCategory = (data) => callAPI(`${urls.artist}/art/category/add`, 'post', {}, {}, data, true);
export const getCategory = () => callAPI(`category`, 'get');
export const deleteCategory = (id) => callAPI(`${urls.admin}/category/delete/${id}`, 'delete');

export const addArt = (data) =>
  callAPI(`${urls.artist}/art/add`, 'post', { 'Content-Type': 'multipart/form-data' }, {}, data, true);
export const editArt = (id, data) =>
  callAPI(`${urls.artist}/art/update/${id}`, 'put', { 'Content-Type': 'multipart/form-data' }, {}, data, true);
export const getArtDetail = (id) => callAPI(`art/${id}`, 'get');

export const getAllDataArt = () => callAPI('dataart', 'get');
export const deleteArtApi = (id) => callAPI(`art/delete/${id}`, 'delete');

export const getdataFav = () => callAPI(`get-favorit-art`, 'get');
export const addtoFavArt = (id) => callAPI(`art/add-to-favorit/${id}`, 'post');
export const deletedFavArt = (id) => callAPI(`art/delete-from-favorit/${id}`, 'delete');
export const getMyUser = () => callAPI('get-profile', 'get');

export const getAllDataArtWaiting = () => callAPI(`${urls.admin}/art`, 'get', {}, {}, {}, true);
export const accArtApi = (id) => callAPI(`${urls.admin}/art/acc/${id}`, 'patch');
export const refuseArtApi = (id) => callAPI(`${urls.admin}/art/refuse/${id}`, 'patch');
export const getUsersApi = () => callAPI(`${urls.admin}/user`, 'get');
export const deleteUserApi = (id) => callAPI(`${urls.admin}/user/delete/${id}`, 'delete');
export const changeRoleUserApi = (id) => callAPI(`${urls.admin}/user/change-role/${id}`, 'patch');
