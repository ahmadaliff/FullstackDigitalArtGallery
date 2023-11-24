import { createSelector } from 'reselect';
import { initialState } from '@pages/Profile/reducer';

const selectArtState = (state) => state.home || initialState;
export const selectDataArt = createSelector(selectArtState, (state) => state.arts);
export const selectDataFav = createSelector(selectArtState, (state) => state.fav);
