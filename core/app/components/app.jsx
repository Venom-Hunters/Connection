import React from "react";
import { Component } from "react";
import HeaderBar from "./header";
import { connect } from "react-redux";

import { getUser, addMessage, initiateSocket } from "../actions/index";

class App extends Component {
  constructor(props)
  {
    super(props);

    this.props.initiateSocket();
  }

  componentWillReceiveProps(props) {
    if (!this.props.socket && props.socket) {
      props.socket.on("RECEIVE_MESSAGE", function(message) {
        this.props.addMessage(message);
      }.bind(this));
      props.socket.on('USER_CAME_ONLINE', function(user) {
        
      })
    } else if (this.props.socket && !props.socket) {
      this.props.socket.off("RECEIVE_MESSAGE");

    } else if (!this.props.socket && !props.socket) {
      this.props.initiateSocket();
    }
  }

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

export default connect(mapStateToProps, { getUser, addMessage, initiateSocket })(App);
