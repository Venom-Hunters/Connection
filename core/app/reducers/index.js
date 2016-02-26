import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import activeTeamReducer from "./active_team_reducer";
import chatReducer from "./chat_reducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  activeTeam: activeTeamReducer,
  chatMessages: chatReducer
});

export default rootReducer;
