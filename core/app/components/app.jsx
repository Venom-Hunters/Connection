import React from "react";
import { Component } from "react";
import HeaderBar from "./header";
import { connect } from "react-redux";

import { getUser, addMessage, initiateSocket, onlineUsers } from "../actions/index";

class App extends Component {
  constructor(props)
  {
    super(props);

    
  }
/*
  componentWillReceiveProps(props) {
    console.log('socket',props);
    if (!this.props.socket && props.socket) {
      props.socket.on("RECEIVE_MESSAGE", function(message) {
        props.addMessage(message);
      }.bind(this));
      props.socket.on('ONLINE_USERS', function(users) {
        props.onlineUsers(users);
      })
    } else if (this.props.socket && !props.socket) {
      this.props.socket.off("RECEIVE_MESSAGE");
    }
  }*/

  showHeader() {
    if (this.props.user && this.props.user._id)
    {
      return <HeaderBar user={this.props.user} />;
    } else {
      this.props.getUser();
      return <HeaderBar />;
    }
  }

  render() {
    return(
      <div className="mainContainer">
        {this.showHeader()}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user,
  socket: state.user.socket };
}

export default connect(mapStateToProps, { getUser, addMessage, initiateSocket, onlineUsers })(App);
