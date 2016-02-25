import { USER_LOGIN, USER_REGISTER, GET_USER_TEAMS} from '../actions/index';

export default function(state = null, action = "") {

  switch(action.type) {
    case(USER_LOGIN):
      return Object.assign({}, state, action.payload.data );
    case(USER_REGISTER):
      console.log(action.payload.data);
   	  return Object.assign({}, state, action.payload.data );
   	case(GET_USER_TEAMS):
   	  return Object.assign({}, state, {teams: action.payload.data} );
    default:
      return state;
    }
}
