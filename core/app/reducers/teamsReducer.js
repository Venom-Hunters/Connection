import {
  USER_LOGIN,
  CREATE_TEAM,
  GET_USER_TEAMS,
  SET_ACTIVE_TEAM,
  ADD_TEAM_MEMBERS,
  USER_GET,
  UPDATE_TEAM_PROFILE,
  DELETE_TEAM,
  CHAT_SESSION
} from "../actions/index";

export default function(state = {all: [], active: {}}, action = "") {
  switch(action.type) {
    case(USER_GET):
      return Object.assign({}, state, {
        active: action.payload.data.lastTeamViewed
      });

    case(CREATE_TEAM):
      return action.payload.data;

    case(GET_USER_TEAMS):
      return Object.assign({}, state, {
        all: action.payload.data
      });

    case(ADD_TEAM_MEMBERS):
      return Object.assign({}, state, {
        active: action.payload.data
      });

    case(SET_ACTIVE_TEAM):
      return Object.assign({}, state, {
        active: action.payload
      });

    case(UPDATE_TEAM_PROFILE):
      return Object.assign({}, state, {
        active: action.payload.data
      });

    case(CHAT_SESSION):
      return Object.assign({}, state, {
        active: action.payload
      });

    case(DELETE_TEAM):
      return Object.assign({}, state, {
        active: action.payload.data
      });

    default:
      return state;
    }
}
