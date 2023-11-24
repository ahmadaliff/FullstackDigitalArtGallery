import { produce } from 'immer';

import { DELETE_USER, RESET_USERS, SET_ROLE, SET_USERS } from './constants';

export const initialState = {
  users: null,
};

export const storedKey = ['users'];

const userListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USERS:
        draft.users = action.users;
        break;
      case DELETE_USER:
        draft.users = state.users.filter((val) => val.id !== action.id);
        break;
      case SET_ROLE:
        if (state.users != null) {
          const temp = [...state.users];
          temp.push(action.user);
          draft.users = temp;
        }
        break;
      case RESET_USERS:
        return initialState;
    }
  });

export default userListReducer;
