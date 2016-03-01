import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, initiateSocket, getUser, getActiveTeamChats } from "../actions/index";
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
		this.props.initiateSocket();
		this.props.getUserTeams();
		this.props.getUser().then(() => {
			this.props.getActiveTeamChats(this.props.activeTeam._id)
			this.props.socket.emit('JOIN_ROOM', this.props.activeTeam._id);
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			teams: props.teams.all,
			activeTeam: props.activeTeam
		});
	}


	clickTeam(team) {
		this.props.socket.emit('LEAVE_ROOM', this.props.activeTeam._id);
		this.setState({
			activeTeam: team
		});
		this.props.setActiveTeam(team);
		this.props.socket.emit('JOIN_ROOM', team._id);

		
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
							return <li key={member._id}> {member.userName} </li>;
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
						<div className="menuIcon"><span className="menuIconInfo">Edit Team</span><Link to="/team/invite" className="zmdi zmdi-edit zmdi-hc-2x"></Link></div>
						<div className="menuIcon"><span className="menuIconInfo">Save Chats</span><Link to="/team/invite" className="zmdi zmdi-file zmdi-hc-2x"></Link></div>
					</div>
				</div>
			);
		} else {
			return;
		}
	}

	/*<span className="hoverable">
		<i className="zmdi zmdi-chevron-down normal"></i>
		<i className="zmdi zmdi-chevron-up hover"></i>
	</span>
	<Link to="/team/invite" className="zmdi zmdi-account-add zmdi-hc-2x activeTeamInviteIcon"></Link>*/

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

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, initiateSocket, getUser, getActiveTeamChats })(SideBar);
