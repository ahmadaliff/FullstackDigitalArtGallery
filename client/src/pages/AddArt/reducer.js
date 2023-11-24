import { produce } from 'immer';

import { DELETE_CATEGORY, RESET_CATEGORY, SET_CATEGORY } from '@pages/AddArt/constants';

export const initialState = {
  category: null,
};

export const storedKey = ['category'];

const artReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CATEGORY:
        if (state.category) {
          draft.category = [...state.category, action.category];
        } else {
          draft.category = action.category;
        }
        break;
      case DELETE_CATEGORY:
        draft.category = state.category.filter((fil) => fil.id !== action.id);
        break;
      case RESET_CATEGORY:
        return initialState;
    }
  });

export default artReducer;
