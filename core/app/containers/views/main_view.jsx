import ChatBox from "../chatBox";
import SideBar from "../sideBar";

import React, {Component} from "react";

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
