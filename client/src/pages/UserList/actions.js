import { CHANGE_ROLE, DELETE_USER, GET_USERS, RESET_USERS, SET_ROLE, SET_USERS } from './constants';

export const getUsers = () => ({
  type: GET_USERS,
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const resetUsers = () => ({
  type: RESET_USERS,
});
export const changeRole = (id, userId, callback) => ({
  type: CHANGE_ROLE,
  id,
  userId,
  callback,
});
export const setRole = (user) => ({
  type: SET_ROLE,
  user,
});
export const deleteUser = (id, userId, callback) => ({
  type: DELETE_USER,
  id,
  userId,
  callback,
});
