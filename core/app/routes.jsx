import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import MainView from "./containers/views/main_view";
import LoginView from "./containers/views/login_view";
import RegistrationView from "./containers/views/register_view";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginView} />
    <Route path="main" component={MainView} />
    <Route path="register" component={RegistrationView} />
  </Route>
);
