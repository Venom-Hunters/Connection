import React, { Component } from "react";
import { Connect } from 'react-router';

import Chat from "../chat";
import SideBar from '../side_bar';

export default class MainView extends Component {
  render() {
    return(

      <div className="mainContainer">
      	<CardStack className="teamSidebar" />
		    <Chat />
      </div>
    );
  }
}
