import React, { Component } from 'react';
import CardStackComponent from '../containers/card_stack_component';

export default class TeamSidebar extends Component {
	render() {
		return (
			<div className="teamSidebar">
				<CardStackComponent />
			</div>
		);
	}
}