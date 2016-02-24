import { USER_LOGIN, USER_REGISTER } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  post: null
};

export default function(state = INITIAL_STATE, action = "") {
  switch(action.type) {
    case(USER_LOGIN):
      console.log(action.payload.data);
      return Object.assign({}, state, { user: action.payload.data} );
    default:
      return state;
    }
}
