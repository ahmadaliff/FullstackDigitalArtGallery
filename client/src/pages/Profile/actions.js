import { GET_USER, RESET_USER, SET_USER } from './constants';

export const getUserData = () => ({
  type: GET_USER,
});

export const setUserData = (user) => ({
  type: SET_USER,
  user,
});
export const resetUserData = () => ({
  type: RESET_USER,
});
