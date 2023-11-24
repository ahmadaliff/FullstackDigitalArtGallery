import { createSelector } from 'reselect';
import { initialState } from '@pages/Profile/reducer';

const selectArtState = (state) => state.waitingArt || initialState;
export const selectDataArt = createSelector(selectArtState, (state) => state.waitingArts);
