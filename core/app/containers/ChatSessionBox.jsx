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
      <div style={{margin: '4px 0'}}>
        <div style={{fontSize: '1.2em'}}>Chat Sessions:</div>
        {this.renderChatSessions()}
      </div>
    );
  }

  renderChatSessions() {
    if (this.props.chatSession) {
      return (
        this.props.chatSession.map((session) => {
          let timeStart = new Date(session.timeStart);
          let timeEnd = new Date(session.timeEnd);
          return (
            <Link to={'/team/sessions/' + session._id} key={session._id} style={{cursor: 'pointer', display: 'block', color: 'blue'}}>
              Start: {timeStart.toLocaleString('en-US')} - End: {timeEnd.toLocaleString('en-US')}
            </Link>
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
