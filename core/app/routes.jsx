import React from "react";
import {Route, IndexRoute} from "react-router";

import App from "./components/app";
import MainView from "./containers/views/main_view";
import TeamView from "./containers/views/team_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";

export default (
  <Route path="/" component={App}>
    <Route path="login" component={LoginView} />
    <Route path="main" component={MainView} />
    <Route path="team" component={TeamView} />
    <Route path="register" component={RegistrationView} />
  </Route>
);
