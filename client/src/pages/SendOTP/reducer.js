import { produce } from 'immer';

import { RESET_TOKEN_OTP, SET_TOKEN_OTP } from '@pages/SendOTP/constants';

export const initialState = {
  tokenOTP: null,
};

export const storedKey = ['tokenOTP'];

const sendOTPreducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TOKEN_OTP:
        draft.tokenOTP = action.data;
        break;
      case RESET_TOKEN_OTP:
        return initialState;
    }
  });

export default sendOTPreducer;
