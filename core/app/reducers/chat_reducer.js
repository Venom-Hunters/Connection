import { ADD_MESSAGE, GET_ACTIVE_TEAM_CHATS, CHAT_SESSIONS } from "../actions/index";

export default function(state = [], action = "") {
  switch(action.type) {
    case(ADD_MESSAGE):
      return [action.payload, ...state];
    case(GET_ACTIVE_TEAM_CHATS):
      return action.payload.data;
    default:
      return state;
    }
}
