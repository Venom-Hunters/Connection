import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {messages} from "../actions/index";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
    console.log(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log(this.props.messages.map());
  }

  render() {
    return (
      <from>
        <div className="row">
          <div className="ten columns">
            <label htmlFor="exampleMessage">Message</label>
            <textarea className="u-full-width"
              placeholder="Message Here..."
              id="exampleMessage"
              onChange={this.onInputChange}></textarea>
          </div>
          <div className="two columns">
            <br/>
            <button
              type="submit"
              onClick={this.onFormSubmit}
              className="button-primary">Submit</button>
          </div>
        </div>
      </from>
    )
  };

}

function mapStateToProps(state) {
  return {messages: state.messages}
}

export default connect(mapStateToProps)(ChatInput);
