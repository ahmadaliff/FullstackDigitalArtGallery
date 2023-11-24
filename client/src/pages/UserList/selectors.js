import { createSelector } from 'reselect';
import { initialState as clientInitialState } from '@containers/Client/reducer';
import { initialState as usersInitialState } from '@pages/UserList/reducer';

const selectLoginState = (state) => state.client || clientInitialState;
export const selectUser = createSelector(selectLoginState, (state) => state.user);
export const selectLogin = createSelector(selectLoginState, (state) => state.login);

const seletUserListState = (state) => state.userList || usersInitialState;
export const selectDataUsers = createSelector(seletUserListState, (state) => state.users);
