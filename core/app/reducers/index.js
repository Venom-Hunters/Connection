import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import activeTeamReducer from "./active_team_reducer";
import chatsReducer from "./chats_reducer";
import findMemberReducer from "./find_member_reducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  activeTeam: activeTeamReducer,
  activeTeamChats: chatsReducer,
  potentialTeamMembers: findMemberReducer
});

export default rootReducer;
