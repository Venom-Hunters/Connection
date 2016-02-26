import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import MainView from "./containers/views/main_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";
import ChatView from "./containers/views/chat_view";
import FormsAndSuch from "./containers/views/forms_and_such_view";
import CreateTeamBox from './components/create_team';
import AddTeamBox from './components/add_team_member';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginView} />
    <Route path="main" component={MainView}>
		<IndexRoute component={ChatView} />
		<Route path="formsAndSuch" component={FormsAndSuch} >
			<Route path="createTeamView" component={CreateTeamBox} />
			<Route path="addMemberView" component={AddTeamBox} />
			
		</Route>
    </Route>
    <Route path="register" component={RegistrationView} />
  </Route>
);
