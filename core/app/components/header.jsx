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
					{this.props.user ? this.props.user.userName :<li className="pure-menu-item"><Link className="pure-menu-link" to="/">Login</Link></li>}
        	<li className="pure-menu-item"><Link className="pure-menu-link" to="main">Main</Link></li>
        	<li className="pure-menu-item"><Link className="pure-menu-link" to="/">Logout</Link></li>
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
