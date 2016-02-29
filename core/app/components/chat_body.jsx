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



  console.log("setting up socket listen");
    this.props.socket.on("RECEIVE_MESSAGE", function(message) {
      console.log('message',message);
      this.addMessage(message);
    }.bind(this));
  console.log(this.socket);
  }

  componentDidMount() {
    this.chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  addMessage(message) {
    this.props.addMessage(message);
    this.chatBody.scrollTop = chatBody.scrollHeight;
  }

  render() {
    return (
      <div id="chatBody" className="chatBody">
        {this.props.messages.map(function(message) {
          return <p className="chatMessage"> {message} </p>;
        }).reverse()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.chatMessages, socket: state.user.socket, activeTeam: state.teams.active };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({addMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
