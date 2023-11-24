import { RESET_TOKEN_OTP, SEND_OTP, SEND_OTP_EMAIL, SET_TOKEN_OTP } from './constants';

export const sendOTPtoemail = (data) => ({
  type: SEND_OTP_EMAIL,
  data,
});
export const sendOTPAction = (data, callback) => ({
  type: SEND_OTP,
  data,
  callback,
});
export const setTokenOTP = (data) => ({
  type: SET_TOKEN_OTP,
  data,
});
export const resetTokenOTP = () => ({
  type: RESET_TOKEN_OTP,
});
