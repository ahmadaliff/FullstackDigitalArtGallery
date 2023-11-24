import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';
import addArtSaga from '@pages/AddArt/saga';
import editArtSaga from '@pages/EditArt/saga';
import profileSaga from '@pages/Profile/saga';
import homeSaga from '@pages/Home/saga';
import waitingArtSaga from '@pages/WaitingArt/saga';
import forgotSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';
import otpSaga from '@pages/SendOTP/saga';
import editProfileSaga from '@pages/EditProfile/saga';
import userListSaga from '@pages/UserList/saga';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    appSaga(),
    loginSaga(),
    registerSaga(),
    addArtSaga(),
    editArtSaga(),
    profileSaga(),
    waitingArtSaga(),
    forgotSaga(),
    resetPasswordSaga(),
    otpSaga(),
    editProfileSaga(),
    userListSaga(),
  ]);
}
