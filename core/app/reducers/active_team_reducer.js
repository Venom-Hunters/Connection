import { USER_LOGIN,  SET_ACTIVE_TEAM} from "../actions/index";

export default function(state = null, action = "") {
  switch(action.type) {
    case(USER_LOGIN):
    	if(action.payload.data.lastTeamViewed) {
    		return Object.assign({}, state, action.payload.data.lastTeamViewed);
    	} else return null;
    	break;

    case(SET_ACTIVE_TEAM):
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
    }
}
