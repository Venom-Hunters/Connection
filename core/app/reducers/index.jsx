import { combineReducers } from "redux";

import SendMessage from "./reducer_sendMessage";

const rootReducer = combineReducers({
  messages: SendMessage
});

export default rootReducer;
