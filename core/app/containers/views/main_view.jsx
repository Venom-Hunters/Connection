import SideBar from "../sideBar";
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";

import { getUser, initiateSocket, addMessage, onlineUsers, getUserTeams } from '../../actions/index';
import { connect} from 'react-redux';

import { browserHistory } from 'react-router';

class MainView extends Component {

  constructor(props) {
    super(props);

    this.props.initiateSocket();
  } 


  componentWillReceiveProps(props) {

    if (!this.props.socket && props.socket) {
      props.socket.on("RECEIVE_MESSAGE", function(message) {
        props.addMessage(message);
      }.bind(this));
      props.socket.on('ONLINE_USERS', function(users) {
        props.onlineUsers(users);
      })
      props.socket.on('UPDATE_TEAMS', function() {
        props.getUser();
        props.getUserTeams();
      })
    } else if (this.props.socket && !props.socket) {
      this.props.socket.off("RECEIVE_MESSAGE");
    }
  }

  componentDidMount() {
    
    this.props.getUser().then(() => {
      this.props.user.socket.emit('I_CAME_ONLINE', this.props.user._id);
    if (!this.props.user._id) {
      browserHistory.push('/login');
    }
  });

  }

  render () {
    if (this.props.user._id) {
        return (
        <div className="mainView">
          <SideBar/>
          <div className="pure-u-4-5 content">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

MainView.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {user: state.user, socket: state.user.socket};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getUser, initiateSocket, addMessage, onlineUsers, getUserTeams }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
