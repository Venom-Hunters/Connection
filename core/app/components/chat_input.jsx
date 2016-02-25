import React, {Component} from "react";
import {connect} from "react-redux";

class ChatInput extends Component {
  render() {
    return (
      <form className="pure-form pure-g">
        
        <textarea placeholder="Write" className="pure-u-1"></textarea>
        <button type="submit" className="pure-button pure-button-primary">Submit</button>
      </form>
    )
  }
}

export default ChatInput;
