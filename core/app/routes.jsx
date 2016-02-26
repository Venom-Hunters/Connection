import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import MainView from "./containers/views/main_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";
import ChatView from "./containers/views/chat_view";
import CreateTeamView from "./containers/views/create_team_view";


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginView} />
    <Route path="main" component={MainView}>
  		<IndexRoute component={ChatView} />
  		<Route path="createNewTeam" component={CreateTeamView} />
    </Route>
    <Route path="register" component={RegistrationView} />
  </Route>
);
