import SideBar from "../sideBar";
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";

import { getUser } from '../../actions/index';
import { connect} from 'react-redux';

import { browserHistory } from 'react-router';

class MainView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
    if (!this.props.user._id) {
      browserHistory.push('/login');
    }
  });

  }

  render () {
    if (this.props.user._id) {
        return (
        <div className="mainView">
          <SideBar/>
          <div className="pure-u-4-5 content">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return <div>"Not logged in"</div>;
    }
  }
}

MainView.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {user: state.user};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ getUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
