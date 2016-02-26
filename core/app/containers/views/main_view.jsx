import ChatBox from "../chatBox";
import React, {Component} from "react";
import SideBar from "../sideBar";
import {Connect} from "react-router";

export default class MainView extends Component {
  render() {
    return (
      <div className="mainView">
  		    <SideBar />
      		<div className="pure-u-4-5 content">
			         {this.props.children}
      		</div>
      </div>
    );
  }
}
