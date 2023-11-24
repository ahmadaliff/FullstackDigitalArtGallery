import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectRegisterState = (state) => state.client || initialState;
export const selectLogin = createSelector(selectRegisterState, (state) => state.login);
