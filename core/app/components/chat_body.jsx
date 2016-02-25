import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class ChatBody extends Component {

  renderMessages() {
    // return this.props.messages.map((message) => {
      return (
        <div>
          <p>
            hello
          </p>
          <span>date</span>
        </div>
      )
    // })
  };

  render() {
    return (
      <div className="chatBody">
        {this.renderMessages()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {messages: state.messages}
}

export default ChatBody;
