import React, {Component} from "react";
import { connect } from "react-redux";
import { getUserTeams, setActiveTeam, getUser, leaveTeam } from "../actions/index";
import {colors}  from "../constants/color_scheme";
import { Link, browserHistory } from "react-router";

class SideBar extends Component{
	constructor(props) {
		super(props);

		this.state = {
			teams: {}
		};
		this.leaveTeam = this.leaveTeam.bind(this);
	}

	componentWillMount() {
        this.props.getUser().then( () => {
            this.props.getUserTeams().then( (response) => {
                this.props.socket.emit('JOIN_ROOMS', this.props.teams);
            });
        });
    }

	componentWillReceiveProps(props) {
		this.setState({
			teams: props.teams.all,
			activeTeam: props.activeTeam
		});

		if (this.props.messages && this.props.messages.length && props.messages && props.messages.length)
		{
			let newMessage = props.messages[0];
			if (this.props.messages[0]._id !== newMessage._id) {
				if (this.props.activeTeam && (newMessage.teamId._id !== this.props.activeTeam._id)) {
					var activeTeam = document.getElementById('team_' + newMessage.teamId._id);
					if (activeTeam) {
						activeTeam.className = "teamActivity";
					}
				}
			}
		}
	}

	clickTeam(team) {
		this.setState({
			activeTeam: team
		});
		this.props.setActiveTeam(team);
	}

	leaveTeam() {
		this.props.leaveTeam(this.props.activeTeam._id, this.props.user._id).then(() => {
			this.props.getUserTeams().then( (response) => {
				let membersToNotify = this.props.activeTeam.members.map((member) => {
					return member._id;
				})
			    this.props.socket.emit('UPDATE_MEMBERS', membersToNotify);
			    browserHistory.push('/');
			});
		});
	}

	renderActiveTeam(team) {
		if (team && team.members && team.members.length) {
			return (
				<div>

					<div className="activeTeamName">
						<span className="activeTeamHeader"> <Link to="/team/chat">{team.teamName} </Link> </span>
						{this.renderMenuControls()}
					</div>
					<ul className="activeTeamMember">

						{team.members.map( (member) => {
							if (this.props.onlineUsers.indexOf(member._id) !== -1) {
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

	renderMenuControls() {
		if (this.props.user._id === this.props.activeTeam.teamLead._id) {
			return (
				<div className="dropDownMenu">
					<i className="zmdi zmdi-menu zmdi-hc-2x" style={{fontSize: '1.4em'}}></i>
					<div className="dropDownContent">
						<div className="menuIcon"><span className="menuIconInfo" style={{bottom: '2px'}}>Manage Members</span><Link to="/team/invite" className="zmdi zmdi-account zmdi-hc-2x" style={{fontSize: '2.2em'}}></Link></div>
						<div className="menuIcon"><span className="menuIconInfo">Manage Team</span><Link to="/team/manage" className="zmdi zmdi-edit zmdi-hc-2x"></Link></div>
						<div className="menuIcon"><span className="menuIconInfo">Chat Sessions</span><Link to="/team/sessions" className="zmdi zmdi-file zmdi-hc-2x"></Link></div>
					</div>
				</div>
			);
		} else if (this.props.user._id !== this.props.activeTeam.teamLead._id) {
			return (
				<div className="dropDownMenu">
					<i className="zmdi zmdi-menu zmdi-hc-2x" style={{fontSize: '1.4em'}}></i>
					<div className="dropDownContent">
						<div className="menuIcon"><span className="menuIconInfo" style={{bottom: '2px'}}>Leave Team</span><span onClick={this.leaveTeam} className="zmdi zmdi-caret-left-circle" style={{fontSize: '1.5em'}}></span></div>
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
				let teamsArray = this.props.teams.map((team) => {
					return team;
				});
				teamsArray.sort(function(a, b) {
  					return a.lowerCaseTeamName == b.lowerCaseTeamName ? 0 : +(a.lowerCaseTeamName < b.lowerCaseTeamName) || -1;
				});
				return (
					<ul className="teamList">
						{teamsArray.map((team) => {
							if (this.props.activeTeam && (team._id === this.props.activeTeam._id)) {
								return (
									<li key={team._id} className="activeTeam">
										{this.renderActiveTeam(this.props.activeTeam)}
									</li>
								);
							}
						})}

						{teamsArray.map((team) => {

							if (this.props.activeTeam && (team._id === this.props.activeTeam._id)) {
								return;
							}
							return <li id={'team_' + team._id} key={team._id} className="team"> <Link to="/team/chat" onClick={this.clickTeam.bind(this, team)}> {team.teamName} </Link> </li>;
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
					Teams <Link to="/team/create" className="zmdi zmdi-plus-circle-o" style={{position: 'relative', top: '5px'}}></Link>
				</h3>
				{this.renderTeamList()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		teams: state.teams.all,
		messages: state.chatMessages,
		activeTeam: state.teams.active,
		socket: state.user.socket,
		user: state.user,
		onlineUsers: state.onlineUsers
	};
}

export default connect(mapStateToProps, { getUserTeams, setActiveTeam, getUser, leaveTeam })(SideBar);
