import { produce } from 'immer';

import { SET_ART, RESET_ART, SET_ART_FAV, RESET_ART_FAV, DELETE_ART_HOME } from '@pages/Home/constants';

export const initialState = {
  arts: null,
  fav: null,
};

export const storedKey = ['arts', 'fav'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ART:
        if (action.art?.deletedId) {
          draft.arts = state.arts.filter((val) => val.artId !== action.art?.deletedId);
        } else if (action.art?.editedId) {
          return initialState;
        } else if (state.arts !== null) {
          const temp = [...state.arts];
          temp.push(action.art);
          draft.arts = temp;
        } else {
          draft.arts = action.art;
        }
        break;
      case SET_ART_FAV:
        if (action.fav?.deletedId) {
          draft.fav = state.fav.filter((val) => val.artId !== action.fav?.deletedId);
        } else if (state.fav !== null) {
          const temp = [...state.fav];
          temp.push(action.fav);
          draft.fav = temp;
        } else {
          draft.fav = action.fav;
        }
        break;
      case DELETE_ART_HOME:
        draft.arts = state?.arts.filter((fil) => fil.id !== action.id);
        draft.tempFav = state?.fav.filter((fil) => fil.artId !== action.id);
        break;
      case RESET_ART:
        return initialState;
      case RESET_ART_FAV:
        return initialState;
    }
  });

export default homeReducer;
