import { combineReducers } from "redux";

import Messages from "./reducer_messages";
import SendMessage from "./reducer_sendMessage";

const rootReducer = combineReducers({
  messages: Messages,
  sendMessage: SendMessage
});

export default rootReducer;
