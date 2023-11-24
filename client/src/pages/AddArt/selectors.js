import { createSelector } from 'reselect';
import { initialState as clientInitialState } from '@containers/Client/reducer';
import { initialState as artInitialState } from '@pages/AddArt/reducer';

const selectLoginState = (state) => state.client || clientInitialState;
export const selectLogin = createSelector(selectLoginState, (state) => state.login);
export const selectUser = createSelector(selectLoginState, (state) => state.user);

const selectAddArtState = (state) => state.art || artInitialState;
export const selectCategory = createSelector(selectAddArtState, (state) => state.category);
