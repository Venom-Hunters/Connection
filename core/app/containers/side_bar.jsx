import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTeams, setActiveTeam, getActiveTeamChats } from '../actions/index';
import {colors}  from '../constants/color_scheme';


class SideBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0
		}
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	
	updateDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight-60,
			userTeams: [],
			activeTeam: {}
		})
	}

	componentWillMount() {
		this.props.getUserTeams();
		this.updateDimensions();
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	comppnentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	checkActiveTeam(teamId) {
		if (teamId === this.props.activeTeam) {
			return false;
		}
	}

	activeTeamClick() {
		if(this.checkActiveTeam(this.props.team._id)){
			this.props.setActiveTeam(this.props.team);
			this.props.getActiveTeamChats(this.props.team._id);
		}
	}

	renderActiveTeam() {
		/*if (!this.props.activeTeam) {
			return;
		}*/
		return (
			<div>
				<div className="activeTeam">Active Team</div>
				<hr />
			</div>
		)
	}

	renderTeamList() {
				
		return this.props.teams.map((team) => {
			
		})
	}

	render() {
		/*if(!this.props.teams) {
			return (
				<div className="teamSidebar">
					<h2>Teams:</h2>
				</div>
			);
		}*/
	
		return (	
			<div className="teamSidebar">
				<div className="teamHeader"><div>Teams:</div><i className="zmdi zmdi-plus-circle-o"></i></div>
				<hr />
				{this.renderActiveTeam()}

			</div>
			//remember to place {this.renderTeamList()} in
			//active team - expanded with team members (red if not online, green if online)
			//all other teams - not expanded
		);
	}
}

function mapStateToProps(state) {
	return {
		teams: state.teams,
		activeTeam: state.activeTeam,
	}
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getActiveTeamChats })(SideBar);