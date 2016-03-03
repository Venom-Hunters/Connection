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
    if (!this.props.activeTeam && (props.activeTeam && props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam._id);
    } else if(this.props.activeTeam && (this.props.activeTeam._id !== props.activeTeam._id)) {
      this.props.getActiveTeamChats(props.activeTeam._id);
    }
  }

  render() {
    if (this.props.messages) {
        return (
          <div id="chatBody" className="chatBody">
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
}

function mapStateToProps(state) {
  return { messages: state.chatMessages, socket: state.user.socket, activeTeam: state.teams.active };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getActiveTeamChats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
