import { USER_LOGIN,  SET_ACTIVE_TEAM} from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case(USER_LOGIN):
      return action.payload.data.lastTeamViewed;
    case(SET_ACTIVE_TEAM):
      return action.payload.data;
    default: 
      return state;
    }
}