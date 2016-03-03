import {
   USER_LOGIN,
   USER_REGISTER,
   GET_USER_TEAMS,
   USER_GET,
   USER_LOGOUT,
   USER_SEARCH,
   INITIATE_SOCKET  } from "../actions/index";

export default function(state = {}, action = "") {
  switch(action.type) {
    case(USER_GET):
      if (action.payload.status === 200)
      {
         return Object.assign({}, state, action.payload.data );
      } else {
         return state;
      }
      break;
    case(USER_LOGIN):
      return Object.assign({}, state, action.payload.data);
    case(USER_REGISTER):
   	  return Object.assign({}, state, action.payload.data );
   	case(GET_USER_TEAMS):
   	  return Object.assign({}, state, {teams: action.payload.data} );
    case(USER_LOGOUT):
      return {};
		case(USER_SEARCH):
			return Object.assign({}, state, {searchResults: action.payload.data} );
    case(INITIATE_SOCKET):
      return Object.assign({}, state, action.payload.data, {socket: action.payload} );
    default:
      return state;
    }
}
