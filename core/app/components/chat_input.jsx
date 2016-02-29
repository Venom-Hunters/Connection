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
    this.props.socket.emit('SEND_MESSAGE', this.state.message);
    /*this.props.sendMessage(this.state.message);*/
  }

  render() {
    return (
      <div className="chatInput">
        <form onSubmit={this.onFormSubmit} className="pure-form chatInputTextarea">
            <textarea className="chatInputTextarea" onKeyPress={this.handleKeyPress} value={this.state.message} onChange={this.onInputChange} placeholder="Enter a message.."></textarea>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.user.socket
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
