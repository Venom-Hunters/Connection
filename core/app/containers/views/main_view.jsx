
import React, { Component } from 'react';
import SideBar from '../side_bar';
import InteractionArea from '../interaction_area';
import { Connect } from 'react-router';

export default class MainView extends Component {
  render() {
    return(

      <div className="mainContainer">
      		<SideBar />
		    <InteractionArea />
      </div>
    );
  }
}
