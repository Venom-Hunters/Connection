import SideBar from "../sideBar";
import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class MainView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user._id) {
      browserHistory.push('/');
    }
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
      return <div></div>;
    }
  }
}

MainView.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(MainView);
