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
          {this.renderTeamInfo()}
      </div>
    );
  }

  renderTeamInfo() {
    if (this.props.activeTeam) {
      return (
        <div>
          <h4>Current Name: {this.props.activeTeam.teamName}</h4>
          <form onSubmit={this.updateTeam} className="pure-form">
            <fieldset>
                <input id="teamName" type="text" onChange={this.onChange} value={this.state.teamName} placeholder={this.props.activeTeam.teamName + '...'} required/>
                <div style={{marginTop: '1em'}}>
                <button type="submit" className="pure-button pure-button-primary">Update</button>
                <Link to="/team/chat" className="pure-button pure-button-secondary">Cancel</Link>
                <button onClick={this.deleteTeam} className="pure-button pure-button-error" style={{marginTop: '1em', background: 'rgb(255, 60, 60)'}}>Delete Team</button>
                </div>
            </fieldset>
          </form>
        </div>
      );
    } else {
      return;
    }
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
    }).then((response) => {
      let membersToNotify = response.payload.data.members.map((member) => {
        return member._id;
      })
      this.props.socket.emit('UPDATE_MEMBERS', membersToNotify);
    });

    this.setState({
      teamName: ""
    });

    this.context.router.push("/team/chat");

  }

  deleteTeam() {
    event.preventDefault();
    let membersToNotify = this.props.activeTeam.members.map((member) => {
        return member._id;
      })
    this.props.deleteTeam(this.props.activeTeam._id).then(() => {
      this.props.socket.emit('UPDATE_MEMBERS', membersToNotify);
      browserHistory.push('/team/chat');
    });
  }
}

ManageTeamBox.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {activeTeam: state.teams.active, teams: state.teams, socket: state.user.socket};
}

export default connect(mapStateToProps, { updateTeam, deleteTeam, setActiveTeam, getUserTeams })(ManageTeamBox);
