import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getUser, getActiveTeamChats } from "../actions/index";
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
		this.props.getUser();
	}

	componentWillReceiveProps(props) {
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
						{this.renderTeamLeadControls()}
					</div>
					<ul className="activeTeamMember">

						{team.members.map( (member) => {
							if (member.loggedIn) {
								return <li key={member._id}><i className="zmdi zmdi-circle" style={{color: 'rgba(0, 255, 0, 0.8)', fontSize: '.7em'}}></i> {member.userName} {this.renderTeamLead(member)}</li>;
							} else {
								return <li key={member._id}><i className="zmdi zmdi-circle" style={{color: 'rgba(255, 10, 10, 0.8)', fontSize: '.7em'}}></i> {member.userName} {this.renderTeamLead(member)}</li>;
							}
						})}
					</ul>
				</div>
			);
		}
	}

	renderTeamLeadControls() {
		if (this.props.user._id === this.props.activeTeam.teamLead._id) {
			return (
				<div className="dropDownMenu">
					<i className="zmdi zmdi-menu zmdi-hc-2x" style={{fontSize: '1.4em'}}></i>
					<div className="dropDownContent">
						<div className="menuIcon"><span className="menuIconInfo" style={{bottom: '2px'}}>Manage Members</span><Link to="/team/invite" className="zmdi zmdi-account zmdi-hc-2x" style={{fontSize: '2.2em'}}></Link></div>
						<div className="menuIcon"><span className="menuIconInfo">Manage Team</span><Link to="/team/manage" className="zmdi zmdi-edit zmdi-hc-2x"></Link></div>
						<div className="menuIcon"><span className="menuIconInfo">Save Chats</span><Link to="/team/invite" className="zmdi zmdi-file zmdi-hc-2x"></Link></div>
					</div>
				</div>
			);
		} else {
			return;
		}
	}

	renderTeamLead(member) {
		if (member._id === this.props.activeTeam.teamLead._id) {
			return (
				<span style={{fontStyle: 'italic'}}>- Lead</span>
			);
			
		} else {
			return;
		}
	}

	renderTeamList() {
		if (this.props.teams && this.props.teams.length) {
				return (
					<ul className="teamList">
						{this.props.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return (
									<li key={team._id} className="activeTeam">
										{this.renderActiveTeam(this.state.activeTeam)}
									</li>
								);
							}
						})}

						{this.props.teams.map((team) => {
							if (this.state.activeTeam && (team._id === this.state.activeTeam._id)) {
								return;
							}
							return <li key={team._id} className="team"> <Link to="/home" onClick={this.clickTeam.bind(this, team)}> {team.teamName} </Link> </li>;
						}).reverse()}
					</ul>
				);
		} else {
				return (
					<div style={{textAlign: "center"}}> You"re not on any team! <br /> Create or join one.</div>
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
		);
	}
}

function mapStateToProps(state) {
	return {
		teams: state.teams.all,
		activeTeam: state.teams.active,
		socket: state.user.socket,
		user: state.user
	};
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getUser, getActiveTeamChats })(SideBar);
