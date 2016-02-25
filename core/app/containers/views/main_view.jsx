
import React, { Component } from 'react';
import CardStack from '../card_stack';
import InteractionArea from '../interaction_area';
import { Connect } from 'react-router';

export default class MainView extends Component {
  render() {
    return(

      <div className="mainContainer">
      		<CardStack className="teamSidebar" />
		    <InteractionArea />
      </div>
    );
  }
}
