import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import activeTeamReducer from "./active_team_reducer";
import chatsReducer from "./chats_reducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  activeTeam: activeTeamReducer,
  activeTeamChats: chatsReducer
});

export default rootReducer;
