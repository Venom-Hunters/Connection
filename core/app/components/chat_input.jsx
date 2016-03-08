import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

import {sendMessage} from "../actions/index";

class ChatInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.startChatSession = this.startChatSession.bind(this);
    this.endChatSession = this.endChatSession.bind(this);
  }

  componentDidMount() {
    document.getElementById("chatInputArea").focus();
  }

  onInputChange(event) {
    this.setState({message: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.onFormSubmit();
      this.setState({message: ""});
    }
  }

  onFormSubmit(event) {
    let messageObj = {
      teamId: this.props.activeTeam,
      message: this.state.message,
      _id: this.props.user._id
    };
    this.props.socket.emit('SEND_MESSAGE', messageObj);
  }

  render() {
    return (
      <div className="chatInput">
        {this.renderChatSessionControls()}
        <form onSubmit={this.onFormSubmit} className="pure-form chatInputTextarea">
            <textarea id="chatInputArea" className="chatInputTextarea" onKeyPress={this.handleKeyPress} value={this.state.message} onChange={this.onInputChange} placeholder="Enter a message.."></textarea>
        </form>
      </div>
    );
  }

  renderChatSessionControls() {
    if (this.props.user && this.props.activeTeam && (this.props.user._id === this.props.activeTeam.teamLead._id)) {
      if (!this.props.activeTeam || !this.props.activeTeam.sessionId) {
        return (
          <div>
            <button onClick={this.startChatSession} className="pure-button pure-button-primary" style={{marginBottom: '0.5em', fontSize: '.8em', padding: '5px'}}>Start Session</button>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={this.endChatSession} className="pure-button pure-button-secondary" style={{marginBottom: '0.5em', fontSize: '.8em', padding: '5px'}}>End Session</button>
          </div>
        );
      }
    } else {
      return;
    }
  }

  startChatSession() {
    this.props.socket.emit('START_CHAT_SESSION', this.props.activeTeam);
    document.getElementById("chatInputArea").focus();
  }

  endChatSession() {
    this.props.socket.emit('END_CHAT_SESSION', this.props.activeTeam);
    document.getElementById("chatInputArea").focus();
  }
}

function mapStateToProps(state) {
  return {
    socket: state.user.socket,
    activeTeam: state.teams.active,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
