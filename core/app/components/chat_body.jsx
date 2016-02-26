import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {addMessage} from "../actions/index"

const socket = io();

class ChatBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };

    socket.on("SEND_MESSAGE", function(message) {
      this.addMessage(message);
    }.bind(this));

  };

  addMessage(message) {
    console.log('sending message');
    this.props.addMessage(message);
  }

  render() {
    console.log(this.state);
    return (
      <div className="chatBody">
        {this.props.messages.map(function(message) {
          console.log(message);
          return message;
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { messages: state.chatMessages };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({addMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
