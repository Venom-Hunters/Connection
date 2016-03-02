import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { updateTeam, deleteTeam, setActiveTeam, getUserTeams } from "../actions/index";

class ManageTeamBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: ""
    };

    this.updateTeam = this.updateTeam.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  componentDidMount() {
    document.getElementById("teamName").focus();
  }

  render() {
    return(
      <div className="teamContent">
        <h2>Manage Team</h2>
        <h4>Current Name: {this.props.activeTeam.teamName}</h4>
        <form onSubmit={this.updateTeam} className="pure-form">
          <fieldset>
              <input id="teamName" type="text" onChange={this.onChange} value={this.state.teamName} placeholder={this.props.activeTeam.teamName + '...'} required/>
              <button type="submit" className="pure-button pure-button-primary">Update</button>
              <Link to="/home" className="pure-button pure-button-secondary">Cancel</Link>
          </fieldset>
        </form>
        <button onClick={this.deleteTeam} className="pure-button pure-button-error" style={{background: 'rgb(255, 60, 60)'}}>Delete Team</button>
      </div>
    );
  }

  onChange(event) {
    this.setState({
      teamName: event.target.value
    });
  }

  updateTeam(event) {
    event.preventDefault();
    
    this.props.updateTeam({
      _id: this.props.activeTeam._id,
      teamName: this.state.teamName
    });

    this.setState({
      teamName: ""
    });

    this.context.router.push("/home");

  }

  deleteTeam() {
    this.props.deleteTeam(this.props.activeTeam._id);
    this.props.getUserTeams();
    browserHistory.push('/home');
  }
}

ManageTeamBox.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {activeTeam: state.teams.active, teams: state.teams};
}

export default connect(mapStateToProps, { updateTeam, deleteTeam, setActiveTeam, getUserTeams })(ManageTeamBox);
