import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { showPopup, setLoading } from '@containers/App/actions';

import { sendEmailOtp, sendOTPApi } from '@domain/api';
import { SEND_OTP, SEND_OTP_EMAIL } from '@pages/SendOTP/constants';
import { setTokenOTP } from '@pages/SendOTP/actions';

function* sendtoEmailOtp({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(sendEmailOtp, data);
    yield put(setTokenOTP(response.data));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sendOTPtoAPI({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(sendOTPApi, data);
    toast.success(response.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* otpSaga() {
  yield takeLatest(SEND_OTP_EMAIL, sendtoEmailOtp);
  yield takeLatest(SEND_OTP, sendOTPtoAPI);
}
