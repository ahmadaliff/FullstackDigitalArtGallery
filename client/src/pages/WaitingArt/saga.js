import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { accArtApi, deleteArtApi, getAllDataArtWaiting } from '@domain/api';

import { resetArtData } from '@pages/Home/actions';
import { showPopup, setLoading } from '@containers/App/actions';
import { deleteArtWaiting, resetArtWaiting, setArtDataWaiting } from '@pages/WaitingArt/actions';
import { ACC_ART, DELETE_ART, GET_ART_WAITING, REFUSE_ART } from '@pages/WaitingArt/constants';

function* getAllArt() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllDataArtWaiting);
    yield put(setArtDataWaiting(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* accArt({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(accArtApi, id);
    toast.success(response.message);
    yield put(resetArtWaiting());
    yield put(resetArtData());
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* refuseArt({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(refuseArt, id);
    toast.success(response.message);
    yield put(resetArtWaiting);
    yield put(resetArtData());
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
    yield put(deleteArtWaiting(id));
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

export default function* waitingArtSaga() {
  yield takeLatest(GET_ART_WAITING, getAllArt);
  yield takeLatest(DELETE_ART, deleteArt);
  yield takeLatest(ACC_ART, accArt);
  yield takeLatest(REFUSE_ART, refuseArt);
}
