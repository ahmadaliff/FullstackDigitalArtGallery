import { EDIT_PROFILE } from './constants';

export const editAccount = (data, callback) => ({
  type: EDIT_PROFILE,
  data,
  callback,
});
