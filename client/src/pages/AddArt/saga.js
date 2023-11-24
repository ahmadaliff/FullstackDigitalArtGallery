import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { addArt, addCategory, deleteCategory, getCategory } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { setCategoryArt } from '@pages/AddArt/actions';

import { ADD_ART, ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from '@pages/AddArt/constants';
import { setArtDataWaiting } from '@pages/WaitingArt/actions';

function* sagaActionAddArt({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addArt, data);
    yield put(setArtDataWaiting(response.data));
    toast.success(response.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaActionAddCategory({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addCategory, data);
    yield put(setCategoryArt(response.data));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 409 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaActionGetCategory() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCategory);
    yield put(setCategoryArt(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaActionDeleteCategory({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteCategory, id);
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* addArtSaga() {
  yield takeLatest(ADD_ART, sagaActionAddArt);
  yield takeLatest(ADD_CATEGORY, sagaActionAddCategory);
  yield takeLatest(GET_CATEGORY, sagaActionGetCategory);
  yield takeLatest(DELETE_CATEGORY, sagaActionDeleteCategory);
}
