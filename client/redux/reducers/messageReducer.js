import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  conversations: [],
  result: 0,
  messages: [],
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
        result: action.payload.result,
        firstLoad: true,
      };

    case MESS_TYPES.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case MESS_TYPES.UPDATE_MESSAGES:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case MESS_TYPES.UPDATE_CONVERSATION:
      let newArr = [...state.conversations];
      newArr = newArr.filter((item) => item._id !== action.payload._id);

      return {
        ...state,
        conversations: [action.payload, ...newArr],
      };
    default:
      return state;
  }
};

export default messageReducer;
