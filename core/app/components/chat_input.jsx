import React, {Component} from "react";
import {connect} from "react-redux";

class ChatInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
    console.log(event.target.value);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      return this.onFormSubmit
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.onFormSubmit} onclassName="pure-form pure-g">
        <textarea onKeyPress={this.handleKeyPress} onChange={this.onInputChange} placeholder="Message Here ..." className="pure-u-21-24"></textarea>
        <button type="submit" className="pure-button pure-button-primary">Submit</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage
  }, dispatch);
}

export default ChatInput;
