import React from "react";
import {Route, IndexRoute} from "react-router";

import App from "./components/app";
import Home from "./components/home";
import MainView from "./components/main_view";
import TeamView from "./components/team_invite_view";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="main" component={MainView} />
    <Route path="team" component={TeamView} />
  </Route>
);
