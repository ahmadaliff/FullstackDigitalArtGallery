import { LOGIN, LOGOUT } from './constants';

export const validateLogin = (data, callback) => ({
  type: LOGIN,
  data,
  callback,
});
export const validateLogout = (callback) => ({
  type: LOGOUT,
  callback,
});
