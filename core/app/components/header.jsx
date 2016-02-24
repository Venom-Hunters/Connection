import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout, updateUserProfile } from '../actions/index';
import Menu from 'react-motion-menu';

class HeaderBar extends Component {



	render() {
		return (
			<div className="headerBar">
				<div className="logo">
					logo
				</div>
				<div className="userCtrls">
					<Menu
					    distance={-80}
					    width={100}
					    height={20}
					    y={-10}
					    x={-100}
					    direction='horizontal' 
					    customStyle={{
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center'
					    }} >
						<i>User name</i>
					    <div><i className="home">Logout</i></div>
					    <div><i className="heart">Update Profile</i></div>
					  </Menu>
				</div>
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