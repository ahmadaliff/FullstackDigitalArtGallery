import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { addtoFavArt, deleteArtApi, deletedFavArt, getAllDataArt, getdataFav } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { setArtData, setFav } from '@pages/Home/actions';
import { ADD_ART_FAV, DELETE_ART_FAV, DELETE_ART_HOME, GET_ART_FAV, GET_ART_HOME } from '@pages/Home/constants';

function* getAllArt() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllDataArt);
    yield put(setArtData(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* getFav() {
  yield put(setLoading(true));
  try {
    const response = yield call(getdataFav);
    yield put(setFav(response.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else if (error?.response?.status !== 404) {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* addArtFav({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(addtoFavArt, id);
    toast.success(response.message);
    yield put(setFav(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* deleteArtFav({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deletedFavArt, id);
    toast.success(response.message);
    yield put(setFav({ deletedId: id }));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* deleteArt({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteArtApi, id);
    yield put(setArtData({ deletedId: id }));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_ART_HOME, getAllArt);
  yield takeLatest(GET_ART_FAV, getFav);
  yield takeLatest(ADD_ART_FAV, addArtFav);
  yield takeLatest(DELETE_ART_FAV, deleteArtFav);
  yield takeLatest(DELETE_ART_HOME, deleteArt);
}
