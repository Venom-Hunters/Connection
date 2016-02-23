import React from 'react';
import { Component } from 'react';
import HeaderBar from './header';

export default class App extends Component {
  render() {
    return(
      <div>
		<HeaderBar />
		<div className="mainContainer">
        	{this.props.children}
        </div>
      </div>
    );
  }
}
