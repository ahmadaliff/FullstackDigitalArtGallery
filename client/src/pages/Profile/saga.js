import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { getMyUser } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { setUserData } from '@pages/Profile/actions';
import { GET_USER } from '@pages/Profile/constants';

function* getUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMyUser);
    yield put(setUserData(response.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* profileSaga() {
  yield takeLatest(GET_USER, getUser);
}
