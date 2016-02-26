import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getActiveTeamChats } from "../actions/index";
import {colors}  from "../constants/color_scheme";
import { Link, browserHistory } from "react-router";

class SideBar extends Component{
	constructor(props) {
		super(props);
		this.renderActiveTeam = this.renderActiveTeam.bind(this);
		this.renderOtherTeamList = this.renderOtherTeamList.bind(this);
	}

	componentWillMount() {
		this.props.getUserTeams();
	}

	activeTeamClick(team, event) {
		this.props.setActiveTeam(team);
		this.props.getActiveTeamChats(team._id);

	}

	routeToCreateNewTeam() {
		browserHistory.push("/main/createNewTeam");
	}

	renderActiveTeam() {
		if (!this.props.activeTeam) {
			return;
		};
		return (
			<div className="activeTeam" style={{cursor: 'pointer'}}>{this.props.activeTeam.teamName}</div>
		);
	}

	renderOtherTeamList() {
		if(!this.props.teams) {
			return <div>Join a team!</div>;
		}
		return this.props.teams.map((team) => {
			if (!this.props.activeTeam) {
				return(
					<div onClick={this.activeTeamClick.bind(this, team)} key={team._id} className="otherTeams" style={{cursor: 'pointer'}}>{team.teamName}</div>
				);
			} else if (this.props.activeTeam && this.props.activeTeam._id !== team._id) {
				return(
					<div onClick={this.activeTeamClick.bind(this, team)} key={team._id} className="otherTeams" style={{cursor: 'pointer'}}>{team.teamName}</div>
				);
			} else {
				return;
			}
			
		})
	}

	render() {
		return (
			<div className="pure-u-1-5 sideBar">
				<h3 className="teamHeader">
					Teams <Link to="/main/formsAndSuch/createTeamView" className="zmdi zmdi-plus-circle-o"></Link>
				</h3>
				{this.renderActiveTeam()}
				{this.renderOtherTeamList()}
			</div>
			//active team - expanded with team members (red if not online, green if online)
			//all other teams - not expanded
		);
	}
}

function mapStateToProps(state) {
	return {
		lastTeamViewed: state.user.lastTeamViewed,
		teams: state.user.teams,
		activeTeam: state.activeTeam
	};
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getActiveTeamChats })(SideBar);
