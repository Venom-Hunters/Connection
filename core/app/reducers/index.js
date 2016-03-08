import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import teamsReducer from "./teamsReducer";
import chatReducer from "./chat_reducer";
import userSearchReducer from "./userSearchReducer";
import onlineUsersReducer from './online_users_reducer';
import chatSessionReducer from './chat_session_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  teams: teamsReducer,
  userSearch: userSearchReducer,
  chatMessages: chatReducer,
  chatSession: chatSessionReducer,
  onlineUsers: onlineUsersReducer
});

export default rootReducer;
