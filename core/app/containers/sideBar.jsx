import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getActiveTeamChats } from "../actions/index";
import {colors}  from "../constants/color_scheme";
import { Link, browserHistory } from "react-router";

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

	routeToCreateNewTeam() {
		browserHistory.push("/main/createNewTeam");
	}

	renderActiveTeam() {
		return (
			<div>
				<div className="activeTeam">
					Active Team
				</div>
				<div className="otherTeams">
					Other Teams
				</div>
			</div>
		);
	}

	renderTeamList() {
		if (this.props.teams && this.props.teams.length) {
				return this.props.teams.map((team) => {
				});
		} else {
				return (
					<div> Join a team!</div>
				);
		}

	}

	render() {
		return (
			<div className="pure-u-1-5 sideBar">
				<h3 className="teamHeader">
					Teams <Link to="/main/formsAndSuch/createTeamView" className="zmdi zmdi-plus-circle-o"></Link>
				</h3>
				{this.renderTeamList()}
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
	};
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getActiveTeamChats })(SideBar);
