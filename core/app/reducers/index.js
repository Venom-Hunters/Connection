import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import activeTeamReducer from "./active_team_reducer";
import teamsReducer from './teamsReducer';
import chatReducer from "./chat_reducer";
import userSearchReducer from './userSearchReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  teams: teamsReducer,
  userSearch: userSearchReducer,
  chatMessages: chatReducer,
});

export default rootReducer;
