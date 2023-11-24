import { FORGOT_PASSWORD } from './constants';

export const sendForgotPassword = (data, callback) => ({
  type: FORGOT_PASSWORD,
  data,
  callback,
});
