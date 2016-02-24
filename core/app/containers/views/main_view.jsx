
import React, { Component } from 'react';
import TeamSidebar from '../../components/team_sidebar';
import InteractionArea from '../interaction_area';
import { Connect } from 'react-router';

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
