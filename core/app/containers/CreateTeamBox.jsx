import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { createTeam, setActiveTeam } from "../actions/index";


class CreateTeamBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: ""
    };

    this.createTeam = this.createTeam.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.getElementById("teamName").focus();
  }

  render() {
    return(
      <div className="teamContent">
        <h2>Create A Team</h2>
        <form onSubmit={this.createTeam} className="pure-form">
          <fieldset>
              <input id="teamName" type="text" onChange={this.onChange} value={this.state.teamName} placeholder="Team Name..." required/>
              <button type="submit" className="pure-button pure-button-primary">Create</button>
              <Link to="/team/chat" className="pure-button pure-button-secondary">Cancel</Link>
          </fieldset>
        </form>
      </div>
    );
  }

  onChange(event) {
    this.setState({
      teamName: event.target.value
    });
  }

  createTeam(event) {
    event.preventDefault();

    this.props.createTeam({teamName: this.state.teamName}).then((response) => {
      this.props.setActiveTeam(response.payload.data.active);
      this.props.socket.emit('JOIN_ROOMS', response.payload.data.all);
      browserHistory.push('/team/chat');
    });

    this.setState({
      teamName: ""
    });

    
 

  }
}

CreateTeamBox.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {socket: state.user.socket};
}

export default connect(mapStateToProps, { createTeam, setActiveTeam })(CreateTeamBox);
