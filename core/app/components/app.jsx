import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return(
      <div className="app">
        {this.props.user.user ? this.props.user.user._id : ""}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}


export default connect(mapStateToProps)(App);
