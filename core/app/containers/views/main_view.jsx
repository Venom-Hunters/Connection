import SideBar from "../sideBar";
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";

import { getUser, initiateSocket, addMessage, onlineUsers, getUserTeams, startChatSession, endChatSession, setActiveTeam } from '../../actions/index';
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
        props.getUser().then(() => {
          props.getUserTeams().then((teams) => {
            if (!teams.payload.data.length) {
              this.props.setActiveTeam();
              props.getUser();
            }
            else if (!this.props.activeTeam && teams.payload.data.length) {
              this.props.setActiveTeam(teams.payload.data[0]);
            } else if (this.props.activeTeam) {
              let teamsToCheck = teams.payload.data.map((team) => {
                return team._id;
              })
              if (teamsToCheck.indexOf(this.props.activeTeam._id) === -1) {
                this.props.setActiveTeam();
              }
            }
            props.socket.emit('JOIN_ROOMS', teams.payload.data);
          });
        });
      }.bind(this))
      props.socket.on('CHAT_SESSION_STARTED', function(activeTeam) {
        props.startChatSession(activeTeam);
      })
      props.socket.on('CHAT_SESSION_ENDED', function(activeTeam) {
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
    } else if (this.props.activeTeam && this.props.activeTeam._id) {
      browserHistory.push('/team/chat');
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
  return {user: state.user, socket: state.user.socket, activeTeam: state.teams.active, teams: state.teams};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getUser, initiateSocket, addMessage, onlineUsers, getUserTeams, startChatSession, endChatSession, setActiveTeam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
