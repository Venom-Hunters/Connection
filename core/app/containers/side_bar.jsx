import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserTeams, setActiveTeam, getActiveTeamChats } from '../actions/index';
import {colors}  from '../constants/color_scheme';
import { Link, browserHistory } from 'react-router';

class SideBar extends Component{

	componentWillMount() {
		this.props.getUserTeams();
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

	routeToCreateTeam() {
		browserHistory.push('/main/formsAndSuch/createTeamView');
	}

	routeToAddMember() {
		browserHistory.push('/main/formsAndSuch/addMemberView');
	}

	renderActiveTeam() {
		/*if (!this.props.activeTeam) {
			return;
		}*/
		return (
				<div className="activeTeam"><i onClick={this.routeToAddMember.bind()} className="zmdi zmdi-plus-circle-o addTeamMember"></i> Active Team
				</div>
		)
	}

	renderTeamList() {
		if (!this.props.teams) {
			return;
		}
		return this.props.teams.map((team) => {
			return (
				<div className="otherTeams"><i onClick={this.routeToAddMember.bind()} className="zmdi zmdi-plus-circle-o addTeamMember"></i> {team.teamName}
				</div>
			);
			
		})
	}

	render() {
		/*if(!this.props.teams) {
			return (
				<div className="teamSidebar">
					<div className="teamHeader"><div>Create New Team:</div><i className="zmdi zmdi-plus-circle-o"></i></div>
				</div>
			);
		}*/

		return (
			<div className="teamSidebar">
				<div className="teamHeader"><div>Teams:</div><i onClick={this.routeToCreateTeam.bind()} className="zmdi zmdi-plus-circle-o" style={{position: 'relative', bottom:'-3px'}}></i></div>
				{this.renderActiveTeam()}
				{this.renderTeamList()}
			</div>
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
