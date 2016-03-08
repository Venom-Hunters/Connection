import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { getSessionChats } from "../actions/index";
import Avatar from "../components/avatar";

class ChatSessionByIdBox extends Component {

  componentDidMount() {
    let id = this.props.params.id;
    this.props.getSessionChats(id);
  }

  render() {
    return(
      <div> 
        <Link to='/team/sessions'className='pure-button pure-button-primary' style={{fontSize: '.9em', margin: '2px 0'}}>Back</Link>
        {this.renderMessages()}
      </div>
    );
  }
  
  renderMessages() {
    if (this.props.chatsInSession) {
      return this.props.chatsInSession.map(function(message) {
        var date = new Date(message.timeStamp);
        return (
          <div  key={message._id} className="userTxt">
            <Avatar email={message.userId.email}/>
            <p className="message user">
              <span className="userName">{message.userId.userName}</span> <span className="time">({date.toLocaleString('en-US')})</span>
              <br/>
              {message.message}
            </p>
          </div>
        )
      }.bind(this));
    } else {
      return (
        <div>No Chats For This Team</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeTeam: state.teams.active, 
    chatsInSession: state.chatSession.chats
  };
}

export default connect(mapStateToProps, { getSessionChats })(ChatSessionByIdBox);
