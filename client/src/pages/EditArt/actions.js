import { EDIT_ART_DETAIL, GET_ART_DETAIL, RESET_ART_DETAIL, SET_ART_DETAIL } from './constants';

export const getArt = (id) => ({
  type: GET_ART_DETAIL,
  id,
});
export const setArt = (art) => ({
  type: SET_ART_DETAIL,
  art,
});
export const resetArt = () => ({
  type: RESET_ART_DETAIL,
});
export const editArt = (id, data, callback) => ({
  type: EDIT_ART_DETAIL,
  id,
  data,
  callback,
});
