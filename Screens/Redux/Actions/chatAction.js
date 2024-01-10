import { CHAT_MESSAGES } from "../types";

export const sendMessage = (payload, role = "user") => async (dispatch) => {
    const obj = {
      index: 0,
      finish_reason: '',
      message: {
        role: role,
        content: payload,
      },
    };
    dispatch({ type: CHAT_MESSAGES, payload: obj });
  };


  export const fetchInitialMessage = () => async (dispatch) => {
    const initialMessage = {
      index: 1, 
      finish_reason: '',
      message: {
        role: 'assistant',
        content: 'Hello! How can I assist you today?',
      },
    };
    dispatch({ type: CHAT_MESSAGES, payload: initialMessage });
  };