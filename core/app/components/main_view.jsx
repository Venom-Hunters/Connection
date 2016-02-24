import React, { Component } from 'react';
import TeamSidebar from './team_sidebar';
import InteractionArea from './interaction_area';

export default class MainView extends Component {
  render() {
    return(
      <div className="mainContainer">
		<TeamSidebar />
		<InteractionArea />
      </div>
    );
  }
}
