import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {addMessage, getActiveTeamChats} from "../actions/index";




class ChatBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };

    this.props.socket.on("RECEIVE_MESSAGE", function(message) {
      this.addMessage(message);
    }.bind(this));
  }

  componentDidUpdate() {
    this.chatBody = document.getElementById("chatBody");

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  componentWillReceiveProps(props) {
    
    if(this.props.activeTeam && (this.props.activeTeam._id !== props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam._id);
    }

  }

  addMessage(message) {
    this.props.addMessage(message);
  }

  render() {
    if (this.props.messages) {
        return (
          <div id="chatBody" className="chatBody">
            {this.props.messages.map(function(message) {
              return <p key={message._id} className="chatMessage"> {message.message} </p>;
            }).reverse()}
          </div>
        );
    } else {
        return (
          <div>Loading Messages...</div>
        );
    }
    
  }
}

function mapStateToProps(state) {
  return { messages: state.chatMessages, socket: state.user.socket, activeTeam: state.teams.active };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ addMessage, getActiveTeamChats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
