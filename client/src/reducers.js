import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';

import artEditReducer from '@pages/EditArt/reducer';
import userProfileReducer from '@pages/Profile/reducer';
import artReducer, { storedKey as storedArtState } from '@pages/AddArt/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import sendOTPreducer, { storedKey as storedOTPState } from '@pages/SendOTP/reducer';
import userListReducer, { storedKey as storedUserListState } from '@pages/UserList/reducer';
import waitingArtReducer, { storedKey as storedWaitingArtState } from '@pages/WaitingArt/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  art: { reducer: artReducer, whitelist: storedArtState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  waitingArt: { reducer: waitingArtReducer, whitelist: storedWaitingArtState },
  otp: { reducer: sendOTPreducer, whitelist: storedOTPState },
  userList: { reducer: userListReducer, whitelist: storedUserListState },
};

const temporaryReducers = {
  language: languageReducer,
  artEdit: artEditReducer,
  myUser: userProfileReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
