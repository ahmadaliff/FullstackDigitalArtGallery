import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { takeLatest, call, put } from 'redux-saga/effects';

import { validateLogin } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { setLogin, setToken, setUser } from '@containers/Client/actions';
import { resetArtData, resetFav } from '@pages/Home/actions';
import { resetArtWaiting } from '@pages/WaitingArt/actions';
import { LOGIN, LOGOUT } from '@pages/Login/constants';
import { resetUserData } from '@pages/Profile/actions';
import { resetTokenOTP } from '@pages/SendOTP/actions';
import { resetUsers } from '@pages/UserList/actions';
import { resetArt } from '@pages/EditArt/actions';
import { resetCategory } from '@pages/AddArt/actions';

function* checkLogin({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(validateLogin, data);
    yield call(callback);
    yield put(setLogin(true));
    yield put(setToken(response.token));
    const { role, id } = jwtDecode(response.token);
    yield put(setUser({ role, id }));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* sagaHandleLogout({ callback }) {
  yield put(setLoading(true));
  try {
    toast.success('Logout Success');
    yield put(setLogin(false));
    yield put(setToken(null));
    yield put(resetArt());
    yield put(resetTokenOTP());
    yield put(resetArtData());
    yield put(resetArtWaiting());
    yield put(resetUserData());
    yield put(resetFav());
    yield put(resetUsers());
    yield put(resetCategory());
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, checkLogin);
  yield takeLatest(LOGOUT, sagaHandleLogout);
}
