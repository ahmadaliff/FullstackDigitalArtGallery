import { SET_LOGIN, SET_LOGOUT, SET_TOKEN, SET_USER } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});
export const setLogout = () => ({
  type: SET_LOGOUT,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});
export const setUser = (user) => ({
  type: SET_USER,
  user,
});
