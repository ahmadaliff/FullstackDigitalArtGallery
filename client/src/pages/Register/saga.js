import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { register } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { REGISTER } from '@pages/Register/constants';

function* handleRegister({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(register, data);
    toast.success(response?.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 409) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(REGISTER, handleRegister);
}
