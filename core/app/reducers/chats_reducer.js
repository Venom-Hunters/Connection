import { GET_ACTIVE_TEAM_CHATS } from '../actions/index';

export default function(state = null, action = "") {
  switch(action.type) {
    case(GET_ACTIVE_TEAM_CHATS):
      return action.payload.data;
    default:
      return state;
    }
}
