import React from "react";
import { Component } from "react";
import HeaderBar from "./header";
import { connect } from "react-redux";

import { getUser } from "../actions/index";

class App extends Component {

  showHeader() {
    if (this.props.user && this.props.user._id)
    {
      return <HeaderBar user={this.props.user} />;
    } else {
      this.props.getUser();
      return <HeaderBar />;
    }
  }

  render() {
    return(
      <div className="mainContainer">
        {this.showHeader()}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}


export default connect(mapStateToProps, { getUser })(App);
