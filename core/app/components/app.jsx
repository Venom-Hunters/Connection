import React from 'react';
import { Component } from 'react';
import HeaderBar from './header';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return(
      <div>
		    <HeaderBar />
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


export default connect(mapStateToProps)(App);
