import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import MainView from "./containers/views/main_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";
import ChatView from "./containers/views/chat_view";
import CreateTeamBox from "./containers/CreateTeamBox";
import ManageTeamBox from "./containers/ManageTeamBox";
import InviteTeamBox from "./containers/InviteTeamBox";
import ChatSessionBox from './containers/ChatSessionBox';
import ChatSessionByIdBox from './containers/ChatSessionByIdBox';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainView} />
    <Route path="/team" component={MainView}>
  		<Route path="/team/chat" component={ChatView} />
  		<Route path="/team/create" component={CreateTeamBox} />
  		<Route path="/team/manage" component={ManageTeamBox} />
      <Route path="/team/invite" component={InviteTeamBox} />
      <Route path="/team/sessions" component={ChatSessionBox} />
      <Route path="/team/sessions/:id" component={ChatSessionByIdBox} />

    </Route>
    <Route path="login" component={LoginView} />
    <Route path="register" component={RegistrationView} />
  </Route>
);
