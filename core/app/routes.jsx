import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import MainView from "./containers/views/main_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";
import ChatView from "./containers/views/chat_view";
import CreateTeamBox from './containers/CreateTeamBox';
import InviteTeamBox from './containers/InviteTeamBox';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginView} />
    <Route path="home" component={MainView}>
  		<IndexRoute component={ChatView} />
  		<Route path="/team/create" component={CreateTeamBox} />
      <Route path="/team/invite" component={InviteTeamBox} />
    </Route>
    <Route path="register" component={RegistrationView} />
  </Route>
);
