import { createSelector } from 'reselect';
import { initialState } from '@pages/SendOTP/reducer';

const selectOtpState = (state) => state.otp || initialState;
export const selectOtp = createSelector(selectOtpState, (state) => state.tokenOTP);
