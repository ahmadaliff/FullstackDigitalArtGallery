import { produce } from 'immer';

import { RESET_ART_DETAIL, SET_ART_DETAIL } from '@pages/EditArt/constants';

export const initialState = {
  art: null,
};

const artEditReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ART_DETAIL:
        draft.art = action.art;
        break;
      case RESET_ART_DETAIL:
        return initialState;
    }
  });

export default artEditReducer;
