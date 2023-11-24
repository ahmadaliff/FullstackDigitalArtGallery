import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { changeRoleUserApi, deleteUserApi, getUsersApi } from '@domain/api';

import { CHANGE_ROLE, DELETE_USER, GET_USERS } from '@pages/UserList/constants';
import { deleteUser, setRole, setUsers } from '@pages/UserList/actions';
import { showPopup, setLoading } from '@containers/App/actions';
import { setLogout } from '@containers/Client/actions';

function* sagaGetUsers() {
  yield put(setLoading(true));
  try {
    const response = yield call(getUsersApi);
    yield put(setUsers(response.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* sagaChangeRole({ id, userId, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(changeRoleUserApi, id);
    if (userId === id) {
      yield put(setLogout());
      yield call(callback);
    } else {
      yield put(setRole(response.data));
    }
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 403 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* sagaDeleteUser({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteUserApi, id);
    yield put(deleteUser(id));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 403 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
export default function* userListSaga() {
  yield takeLatest(GET_USERS, sagaGetUsers);
  yield takeLatest(CHANGE_ROLE, sagaChangeRole);
  yield takeLatest(DELETE_USER, sagaDeleteUser);
}
