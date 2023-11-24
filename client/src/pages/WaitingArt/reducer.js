import { produce } from 'immer';

import { SET_ART_WAITING, RESET_ART_WAITING, DELETE_ART } from '@pages/WaitingArt/constants';

export const initialState = {
  waitingArts: null,
};

export const storedKey = ['waitingArts'];

const waitingArtReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ART_WAITING:
        if (state.waitingArts !== null) {
          const temp = [...state.waitingArts];
          temp.push(action.data);
          draft.waitingArts = temp;
        } else if (action.data?.id) {
          draft.waitingArts = [action.data];
        } else {
          draft.waitingArts = action.data;
        }
        break;
      case RESET_ART_WAITING:
        return initialState;
      case DELETE_ART:
        draft.waitingArts = state.waitingArts.filter((val) => val.artId !== action.id);
    }
  });

export default waitingArtReducer;
