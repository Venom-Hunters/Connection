import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getActiveTeamChats } from "../actions/index";
import {colors}  from "../constants/color_scheme";
import { Link, browserHistory } from "react-router";

class SideBar extends Component{
	constructor(props) {
		super(props);

		this.state = {
			teams: {}
		};
	}

	componentWillMount() {
		this.props.getUserTeams();
	}

	componentWillReceiveProps(props) {
		console.log('New Props');
		console.log(props);
		this.setState({
			teams: props.teams.all,
			activeTeam: props.activeTeam
		});
	}


	clickTeam(team) {
		this.setState({
			activeTeam: team
		});
		this.props.setActiveTeam(team);
	}

	renderActiveTeam(team) {
		if (team && team.members && team.members.length) {
			return (
				<div>
					<div className="activeTeamName">
						<span className="activeTeamHeader"> <Link to="/home">{team.teamName} </Link> </span>
						<Link to="/team/invite" className="zmdi zmdi-account-add zmdi-hc-2x activeTeamInviteIcon"></Link>
					</div>

						<ul className="activeTeamMember">
						{team.members.map( (member) => {
							return <li key={member._id}> {member.userName} </li>;
						})}
						</ul>
				</div>
			);
		}
	}


	renderTeamList() {
		if (this.state.teams && this.state.teams.length) {
			console.log(this.state.activeTeam);
				return (
					<ul className="teamList">
						{this.state.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return (
									<li key={team._id} className="activeTeam">
										{this.renderActiveTeam(this.state.activeTeam)}
									</li>
								);
							}
						})}

						{this.state.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return;
							}
							return <li key={team._id} className="team"> <Link to="/home" onClick={this.clickTeam.bind(this, team)}> {team.teamName} </Link> </li>;
						}).reverse()}
					</ul>
				);
		} else {
				return (
					<div style={{textAlign: "center"}}> You're not on any team! <br /> Create or join one.</div>
				);
		}
	}

	render() {
		return (
			<div className="pure-u-1-5 sideBar">
				<h3 className="teamHeader">
					Teams <Link to="/team/create" className="zmdi zmdi-plus-circle-o"></Link>
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
		activeTeam: state.teams.active
	};
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getActiveTeamChats })(SideBar);
