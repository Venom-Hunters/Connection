import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {sendMessage} from "../actions/index";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  onInputChange(event) {
    this.setState({term: event.target.value});
    console.log(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log("out");
    this.props.sendMessage(this.state.term, String(new Date()));
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="row">
          <div className="ten columns">
            <label htmlFor="exampleMessage">Message</label>
            <textarea className="u-full-width"
              ref="createMessage"
              placeholder="Message Here..."
              id="exampleMessage"
              onChange={this.onInputChange}></textarea>
          </div>
          <div className="two columns">
            <br/>
            <button
              type="submit"
              className="button-primary">Submit</button>
          </div>
        </div>
      </form>
    )
  };

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChatInput);
