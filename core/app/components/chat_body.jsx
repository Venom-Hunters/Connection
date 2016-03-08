import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Avatar from "./avatar";
import {getActiveTeamChats} from "../actions/index";

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    if (this.props.activeTeam && this.props.activeTeam._id) {
      this.props.getActiveTeamChats(this.props.activeTeam);
    }
  }

  componentDidUpdate() {
    this.chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  componentWillReceiveProps(props) {
    if (!props.activeTeam) {
      return;
    } else if (!this.props.activeTeam && (props.activeTeam && props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam);
    } else if (this.props.activeTeam && (this.props.activeTeam._id !== props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam);
    }
  }

  renderMessages() {
    return this.props.messages.map(function(message) {
      var date = new Date(message.timeStamp);

      if (this.props.activeTeam && ((message.teamId === this.props.activeTeam._id) || (message.teamId._id === this.props.activeTeam._id))) {
        if (message.userId._id === this.props.user._id) {
          return (
            <div  key={message._id} className="userTxt">
              <Avatar email={this.props.user.email}/>
              <p className="message user">
                <span className="userName">{message.userId.userName}</span> <span className="time">({date.toLocaleTimeString('en-US')})</span>
                <br/>
                {message.message}
              </p>
            </div>
          )
          }else {
            return (
              <div key={message._id} className="guessTxt">
                <Avatar email={message.userId.email}/>
                <p className="message guess">
                  <span className="userName">{message.userId.userName}</span> <span className="time">({date.toLocaleTimeString('en-US')})</span>
                  <br/>
                  {message.message}
                </p>
              </div>
            )
          }
      }
    }.bind(this)).reverse();
  }

  render() {
    if (this.props.messages) {
      return (
        <div id="chatBody" className="chatBody">
          {this.renderMessages()}
        </div>
      )
    } else {
      return (
        <div>Loading Messages...</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chatMessages,
    activeTeam: state.teams.active,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getActiveTeamChats
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
