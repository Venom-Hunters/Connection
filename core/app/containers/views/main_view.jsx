import Chat from "../chat";
import React, {Component} from 'react';
import SideBar from '../side_bar';
import { Connect } from 'react-router';

export default class MainView extends Component {
  render() {
    return (
      <div className="mainContainer">

      		<SideBar />
      		<div>
			    {this.props.children}
      		</div>

      </div>
    );
  }
}
