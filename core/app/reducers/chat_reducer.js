import { ADD_MESSAGE, GET_MESSAGES } from "../actions/index";

export default function(state = [], action = "") {
  console.log(action.type);
  switch(action.type) {
    case(ADD_MESSAGE):
      return [action.payload, ...state];
    case(GET_MESSAGES):
      return action.payload.data;
    default:
      return state;
    }
}
