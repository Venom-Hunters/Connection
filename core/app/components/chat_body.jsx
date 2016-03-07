import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getActiveTeamChats} from "../actions/index";

class ChatBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    this.startChatSession = this.startChatSession.bind(this);
    this.endChatSession = this.endChatSession.bind(this);
  }

  componentDidMount() {
    if (this.props.activeTeam && this.props.activeTeam._id) {
      this.props.getActiveTeamChats(this.props.activeTeam._id);
    }
  }

  componentDidUpdate() {
    this.chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
  }


  componentWillReceiveProps(props) {
    if (!props.activeTeam) {
      return;
    }
    else if (!this.props.activeTeam && (props.activeTeam && props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam._id);
    } else if(this.props.activeTeam && (this.props.activeTeam._id !== props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam._id);
    }
  }

  render() {
    if (this.props.messages) {
        return (
          <div id="chatBody" className="chatBody">
            {this.renderChatSessionControls()}
            {this.props.messages.map(function(message) {
              var date = new Date(message.timeStamp);

              if (this.props.activeTeam && ((message.teamId === this.props.activeTeam._id) || (message.teamId._id === this.props.activeTeam._id)))
              {
                return ( <p key={message._id} className="chatMessage">
                [{date.toLocaleTimeString('en-US')}] {message.userId.userName} : {message.message} </p>
              );
            }
          }.bind(this)).reverse()}
          </div>
        );
    } else {
        return (
          <div>Loading Messages...</div>
        );
    }
  }

  renderChatSessionControls() {
    if (!this.props.activeTeam || !this.props.activeTeam.sessionId) {
      return (
        <div>
          <button onClick={this.startChatSession} className="pure-button pure-button-primary">Start Session</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.endChatSession} className="pure-button pure-button-secondary">End Session</button>
        </div>
      );
    }
  }

  startChatSession() {
    this.props.socket.emit('START_CHAT_SESSION', this.props.activeTeam);
  }

  endChatSession() {
    this.props.socket.emit('END_CHAT_SESSION', this.props.activeTeam);
  }
}



function mapStateToProps(state) {
  return { 
    messages: state.chatMessages, 
    socket: state.user.socket, 
    activeTeam: state.teams.active 
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getActiveTeamChats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
