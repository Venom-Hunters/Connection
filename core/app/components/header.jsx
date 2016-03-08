import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";

import Avatar from "./avatar";
import { userLogout, updateUserProfile } from "../actions/index";

class HeaderBar extends Component {

	constructor(props) {
		super(props);
		this.renderLogoutButton = this.renderLogoutButton.bind(this);
	}

	renderLogoutButton(user) {
		if (user && user.userName) {
			return (
	    	<li className="pure-menu-item" style={{cursor: 'pointer'}}>
					<a className="pure-menu-link" onClick={this.userLogout.bind(this)}>Logout</a>
				</li>
			);
		}
	}

	userLogout() {
		this.props.socket.emit('I_LOGGED_OFF', this.props.user._id);
		this.props.userLogout().then(() => {
			this.context.router.push("/login");
		});
	}

	render() {
		if (this.props.user._id) {
		return (
			<div className="header">
				<div className="pure-menu pure-menu-horizontal">
					<ul className="pure-menu-list">
						<li  className="pure-menu-item">
							{this.props.user && this.props.user.userName ? <Avatar email={this.props.user.email} className="pure-menu-link"/> : ""}
						</li>
						<li className="pure-menu-item">
							{this.props.user && this.props.user.userName ? <Link className="pure-menu-link" to="/"> {this.props.user.userName} </Link> : ""}
						</li>
						{ this.renderLogoutButton(this.props.user) }
	    			</ul>
					<img src="../../../assets/img/reylink-logo-sm.png" className="logo"/>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
	}
}

HeaderBar.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state) {
	return {
		user: state.user,
		socket: state.user.socket
	};
}

export default connect(mapStateToProps, { userLogout, updateUserProfile })(HeaderBar);
