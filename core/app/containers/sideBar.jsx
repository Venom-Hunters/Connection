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

		this.setState({
			teams: props.teams.all,
			activeTeam: props.teams.active
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
					<h3 className="activeTeamName"> {team.teamName} </h3>
						<ul className="activeTeamMember">
						{team.members.map( (member) => {
							return <li> {member.userName} </li>;
						})}
						</ul>
						<div className="activeTeamInvite">
							<Link to="/team/invite">Invite a user</Link>
						</div>
				</div>
			);
		}
	}


	renderTeamList() {
		if (this.state.teams && this.state.teams.length) {
				return (
					<ul className="teamList">
						{this.state.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return (
									<li key={team._id} className="activeTeam">
										{this.renderActiveTeam(team)}
									</li>
								);
							}
						})}
						{this.state.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return;
							}
							return <li key={team._id} className="team"> <a onClick={this.clickTeam.bind(this, team)}> {team.teamName} </a> </li>;
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
