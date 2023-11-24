import { produce } from 'immer';

import { SET_USER, RESET_USER } from '@pages/Profile/constants';

export const initialState = {
  user: null,
};

const userProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.user;
        break;
      case RESET_USER:
        return initialState;
    }
  });

export default userProfileReducer;
