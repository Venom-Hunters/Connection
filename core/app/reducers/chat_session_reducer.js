import { CHAT_SESSIONS, SESSION_CHATS } from "../actions/index";

export default function(state = {}, action = "") {
  switch(action.type) {
    case(CHAT_SESSIONS):
      return Object.assign({}, state, {sessions: action.payload.data});
    case(SESSION_CHATS):
      return Object.assign({}, state, {chats: action.payload.data});
    default:
      return state;
    }
}
