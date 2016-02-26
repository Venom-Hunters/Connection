import ChatBox from "../chatBox";
import React, {Component} from "react";
import SideBar from "../side_bar";
import {Connect} from "react-router";

export default class MainView extends Component {
  render() {
    return (
      <div className="mainContainer">
      		<SideBar />
      		<div className="chat">
			      {this.props.children}
      		</div>
      </div>
    );
  }
}
