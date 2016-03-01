import {
  USER_LOGIN,
  CREATE_TEAM,
  GET_USER_TEAMS,
  SET_ACTIVE_TEAM,
  ADD_TEAM_MEMBERS,
  USER_GET
} from "../actions/index";

export default function(state = {all: [], active: {}}, action = "") {
  switch(action.type) {
    case(USER_GET):
    console.log('get user', action.payload.data);
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
        console.log('team reducer', action.payload);
      return Object.assign({}, state, {
        active: action.payload
      });

    default:
      return state;
    }
}
