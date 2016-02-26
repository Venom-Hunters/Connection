import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {addMessage} from "../actions/index";




class ChatBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };

    this.socket = io();

    this.socket.on("SEND_MESSAGE", function(message) {
      this.addMessage(message);
    }.bind(this));

  }

  componentWillUnmount()
  {
    this.socket.off("SEND_MESSAGE");
  }

  addMessage(message) {
    console.log('sending message');
    this.props.addMessage(message);
  }

  render() {
    console.log(this.state);
    return (
      <div className="chatBody">
        {this.props.messages.map(function(message) {
          return <p className="chatMessage"> {message} </p>;
        }).reverse()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.chatMessages };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({addMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
