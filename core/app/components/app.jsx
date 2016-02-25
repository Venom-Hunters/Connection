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
    }
  }

  render() {
    return(
      <div>
        {this.showHeader()}
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
