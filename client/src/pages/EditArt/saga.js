import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { editArt, getArtDetail } from '@domain/api';

import { setArt } from '@pages/EditArt/actions';
import { setArtData } from '@pages/Home/actions';
import { showPopup, setLoading } from '@containers/App/actions';
import { EDIT_ART_DETAIL, GET_ART_DETAIL } from '@pages/EditArt/constants';

function* sagaActionGetArt({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getArtDetail, id);
    yield put(setArt(response.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaActionEditArt({ id, data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(editArt, id, data);
    yield put(setArtData({ editedId: id }));
    toast.success(response.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* editArtSaga() {
  yield takeLatest(GET_ART_DETAIL, sagaActionGetArt);
  yield takeLatest(EDIT_ART_DETAIL, sagaActionEditArt);
}
