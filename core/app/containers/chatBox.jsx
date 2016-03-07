import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import ChatBody from "../components/chat_body";
import ChatInput from "../components/chat_input";
import Info from "../components/info";
import {getActiveTeamChats} from "../actions/index";

export default class App extends Component {

  renderChat() {
    if (this.props.activeTeam) {
      return (
        <div className="chatBox">
          <ChatBody />
          <ChatInput />
        </div>
      )
    } else {
      return (
        <Info />
      )
    }
  }

  render() {
    return (
      <div className="chatBox">
        {this.renderChat()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {activeTeam: state.teams.active};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getActiveTeamChats
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
