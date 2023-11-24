import { ACC_ART, DELETE_ART, GET_ART_WAITING, REFUSE_ART, RESET_ART_WAITING, SET_ART_WAITING } from './constants';

export const getArtDataWaiting = () => ({
  type: GET_ART_WAITING,
});
export const setArtDataWaiting = (data) => ({
  type: SET_ART_WAITING,
  data,
});
export const accArtWaiting = (id) => ({
  type: ACC_ART,
  id,
});
export const refuseArtWaiting = (id) => ({
  type: REFUSE_ART,
  id,
});
export const deleteArtWaiting = (id) => ({
  type: DELETE_ART,
  id,
});
export const resetArtWaiting = () => ({
  type: RESET_ART_WAITING,
});
