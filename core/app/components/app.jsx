import React from 'react';
import { Component } from 'react';
import HeaderBar from './header';
import { connect } from 'react-redux';

import { getUser } from '../actions/index';

class App extends Component {

  getUserInfo() {
    this.props.getUser();
  }



  render() {
    return(
      <div>
        {this.props.user ? <HeaderBar user={this.props.user}/> : this.getUserInfo()}
  		  <div className="mainContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}


export default connect(mapStateToProps, { getUser })(App);
