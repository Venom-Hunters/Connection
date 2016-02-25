import React, { Component } from "react";
import CardStack from "../card_stack";
import Chat from "../chat";
import { Connect } from "react-router";

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
