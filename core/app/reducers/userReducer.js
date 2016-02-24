import { USER_LOGIN, USER_REGISTER } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  post: null
};

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  return state;
}
