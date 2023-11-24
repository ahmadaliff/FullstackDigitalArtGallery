import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { editProfileAPI } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { resetUserData } from '@pages/Profile/actions';
import { setUser } from '@containers/Client/actions';
import { EDIT_PROFILE } from '@pages/EditProfile/constants';

function* handleEditProfile({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(editProfileAPI, data);
    toast.success(response?.message);
    yield put(setUser({ id: response?.data?.id, role: response?.data?.role }));
    yield call(resetUserData);
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

export default function* editProfileSaga() {
  yield takeLatest(EDIT_PROFILE, handleEditProfile);
}
