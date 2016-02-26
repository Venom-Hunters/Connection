import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

import {sendMessage} from "../actions/index";

class ChatInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({message: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.onFormSubmit();
      this.setState({message: ""});
    }
  }

  onFormSubmit(event) {
    this.props.sendMessage(this.state.message);
  }

  render() {
    return (
      <div className="chatInput">
        <form onSubmit={this.onFormSubmit} className="pure-form">
            <textarea onKeyPress={this.handleKeyPress} value={this.state.message} onChange={this.onInputChange} placeholder="Message Here ..." className="pure-u-1"></textarea>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChatInput);
