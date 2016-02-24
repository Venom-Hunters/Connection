import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout, updateUserProfile } from '../actions/index';
import {Link} from "react-router";
import Menu from 'react-motion-menu';

class HeaderBar extends Component {

	render() {
		return (
			<div className="headerBar">
				<Menu
          direction="horizontal"
          customStyle={{
          color: "#fff",
          textAlign: "center",
          lineHeight: "40px",
          backgroundColor: "#1F8DD6",
          border: "solid 1px #1F8DD6",
          cursor: "pointer"
          }}
          distance={-80}
          width={70}
          height={40}
          y={5}
          x={window.innerWidth - 80}>
          <div>
            name
          </div>
          <div>
						<Link to="main">Main</Link>
          </div>
          <div>
						<Link to="/">Login</Link>
          </div>
          <div>
						<Link to="register">Register</Link>
          </div>
        </Menu>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { userLogout, updateUserProfile })(HeaderBar);
