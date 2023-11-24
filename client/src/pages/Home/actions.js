import {
  ADD_ART_FAV,
  DELETE_ART_FAV,
  DELETE_ART_HOME,
  GET_ART_FAV,
  GET_ART_HOME,
  RESET_ART,
  RESET_ART_FAV,
  SET_ART,
  SET_ART_FAV,
} from './constants';

export const getArtData = () => ({
  type: GET_ART_HOME,
});
export const addArtFav = (id) => ({
  type: ADD_ART_FAV,
  id,
});
export const deleteArtFav = (id) => ({
  type: DELETE_ART_FAV,
  id,
});
export const deleteArtHome = (id) => ({
  type: DELETE_ART_HOME,
  id,
});
export const getFav = () => ({
  type: GET_ART_FAV,
});
export const setFav = (fav) => ({
  type: SET_ART_FAV,
  fav,
});
export const resetFav = () => ({
  type: RESET_ART_FAV,
});
export const setArtData = (art) => ({
  type: SET_ART,
  art,
});
export const resetArtData = () => ({
  type: RESET_ART,
});
