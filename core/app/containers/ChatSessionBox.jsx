import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { getChatSessions } from "../actions/index";

class ChatSessionBox extends Component {

  componentWillMount() {
    this.props.getChatSessions(this.props.activeTeam);
  }

  render() {
    return(
      <div style={{paddingTop: '1em', minWidth: '400px'}}>
        <h3 style={{fontSize: '1.5em'}}>Chat Sessions:</h3>
        <div style={{overflowY: 'auto'}}>{this.renderChatSessions()}</div>
      </div>
    );
  }

  renderChatSessions() {
    if (this.props.chatSession) {
      return (
        this.props.chatSession.map((session) => {
          let timeStart = new Date(session.timeStart);
          return (
            <div key={session._id}>
              <Link to={'/team/sessions/' + session._id} style={{cursor: 'pointer', color: 'blue'}}>Start: {timeStart.toLocaleString('en-US')}</Link>
              <span> - Messages: {session.chatQty}</span>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading Sessions</div>
      );
    }

  }

 }

function mapStateToProps(state) {
  return {
    activeTeam: state.teams.active, 
    chatSession: state.chatSession.sessions
  };
}

export default connect(mapStateToProps, { getChatSessions })(ChatSessionBox);
