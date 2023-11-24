import { REGISTER } from './constants';

export const registerAccount = (data, callback) => ({
  type: REGISTER,
  data,
  callback,
});
