import React, {Component} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import {sendMessage} from '../actions/index';

const chatInputStyle = {
      boxSizing: 'border-box',
      width: 75 + '%',
      display: 'inline-block',
      padding: 0.5 + 'em'
      };

export class ChatInput extends Component {

  constructor(props) {
    super(props);

    this.state = { message: '' };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  changeUsername(event) {
    this.setState({ userName: event.target.value });
  }

  onKeyPress(event) {
    console.log(event.target.value);
    if (event.charCode === 13) {
      this.setState({ message: '' });
      this.props.sendMessage(this.state.message, this.state.userName);
    }
  }

  onChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div>
      <input placeholder="Username"
        onChange={this.changeUsername}
        style={
          {
            width: 25 + '%',
            display: 'inline-block',
            boxSizing: 'border-box',
            padding: 0.5 + 'em'}
        } />
        
      <input
        placeholder="Message"
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
        style={chatInputStyle}
        value={this.state.message}
      />
  </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChatInput);
