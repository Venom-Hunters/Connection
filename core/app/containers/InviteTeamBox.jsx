import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { createTeam, searchUsers } from "../actions/index";

class InviteTeamBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTeam: {},
      searchTerm: "",
      searchResults: []
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchField').focus();
  }

  componentWillReceiveProps(props) {
    this.setState({ searchResults: props.searchResults
    });
  }

  render() {
    return(
      <div className="teamContent">
        <h2>Invite Team Members</h2>

        <form className="pure-form" onSubmit={this.onSubmit}>
          <fieldset>
              <input id="searchField" type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search for user.." required/>
              <Link to="/home" className="pure-button pure-button-secondary">Cancel</Link>
          </fieldset>
        </form>
        <ul>
        {this.renderSearchList()}
      </ul>

      </div>
    );
  }

  renderSearchList() {
    if(this.state.searchResults && Array.isArray(this.state.searchResults) && this.state.searchResults.length) {
      return this.state.searchResults.map((searchResult) => {
        return <li> {searchResult.userName} </li>;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
  }

  onChange(event) {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
    this.props.searchUsers(event.target.value);
  }
}

InviteTeamBox.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {activeTeam: state.teams.active, searchResults: state.userSearch};
}

export default connect(mapStateToProps, { createTeam, searchUsers })(InviteTeamBox);
