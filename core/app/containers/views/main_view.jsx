import SideBar from "../sideBar";
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";

import { getUser, initiateSocket, addMessage, onlineUsers, getUserTeams, startChatSession, endChatSession } from '../../actions/index';
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
        props.getUserTeams().then((teams) => {
          props.socket.emit('JOIN_ROOMS', teams.payload.data);
        });
      })
      props.socket.on('CHAT_SESSION_STARTED', function(activeTeam) {
        console.log('chat: ', activeTeam);
        props.startChatSession(activeTeam);
      })
      props.socket.on('CHAT_SESSION_ENDED', function(activeTeam) {
        console.log('chat session ended --->',activeTeam);
        props.endChatSession(activeTeam);
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
  return {user: state.user, socket: state.user.socket, activeTeam: state.teams.active};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getUser, initiateSocket, addMessage, onlineUsers, getUserTeams, startChatSession, endChatSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
