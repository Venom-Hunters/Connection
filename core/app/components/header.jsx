import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogout, updateUserProfile } from "../actions/index";
import { Link } from "react-router";

class HeaderBar extends Component {
	render() {
		return (
			<div className="pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					<li className="pure-menu-item">
					{this.props.user ? <Link className="pure-menu-link" to="/"> {this.props.user.userName + "\"s profile"} </Link> : <Link className="pure-menu-link" to="/"> Login </Link>}
					</li>
        	<li className="pure-menu-item">
						<Link className="pure-menu-link" to="main">Main</Link>
					</li>
        	<li className="pure-menu-item">
						<Link className="pure-menu-link" onClick={this.props.userLogout} to="/">Logout</Link>
					</li>
    		</ul>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { userLogout, updateUserProfile })(HeaderBar);
