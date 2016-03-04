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
import WebRtcBox from "./components/rtc";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainView} />
    <Route path="/team" component={MainView}>
  		<Route path="/team/chat" component={ChatView} />
  		<Route path="/team/create" component={CreateTeamBox} />
  		<Route path="/team/manage" component={ManageTeamBox} />
      	<Route path="/team/invite" component={InviteTeamBox} />
    </Route>
    <Route path="rtc" component={WebRtcBox} />
    <Route path="login" component={LoginView} />
    <Route path="register" component={RegistrationView} />
  </Route>
);
