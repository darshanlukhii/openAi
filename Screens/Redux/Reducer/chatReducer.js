import {CHAT_MESSAGES} from '../types';

const INITIAL_STATE = {
  messages: [],
};

const chatReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHAT_MESSAGES:
      return {...state, messages: [...state?.messages, payload]};
    default:
      return state;
  }
};

export default chatReducer