import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { createTeam, searchUsers, addTeamMembers } from "../actions/index";

class InviteTeamBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTeam: this.props.activeTeam,
      searchTerm: "",
      searchResults: [],
      membersToAdd: []
    };

    this.onChange = this.onChange.bind(this);
    this.renderMembersToAdd = this.renderMembersToAdd.bind(this);
    this.removeSearchResult = this.removeSearchResult.bind(this);
    this.addMembers = this.addMembers.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchField').focus();
  }

  componentWillReceiveProps(props) {
    this.setState({ searchResults: props.searchResults,
      activeTeam: props.activeTeam
    });
  }

  render() {
    return(
      <div style={{margin: "0 auto"}} className="teamContent">
        <h2>Invite Team Members</h2>

        <form className="pure-form" onSubmit={this.onSubmit}>
          <fieldset>
              <input id="searchField" className="memberSearchField" type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search for user.." required/>
              <a onClick={this.clearSearch.bind(this)} className="pure-button pure-button-secondary">Clear</a>
          </fieldset>
        </form>

        {this.renderMembersToAdd()}

        {this.renderSearchList()}

      </div>
    );
  }

  addMembers() {
    this.props.addTeamMembers(this.state.activeTeam._id, this.state.membersToAdd);
    this.clearSearch();
  }

  clearSearch() {
    this.setState({ searchTerm: "", searchResults: [], membersToAdd: [] });
  }

  renderSearchList() {
    if(this.state.searchResults && Array.isArray(this.state.searchResults) && this.state.searchResults.length) {

      return (

        <div>
          <h3> Search Results </h3>
        <ul style={{padding: 0, listStyle: "none"}}>
        {this.state.searchResults.map((searchResult) => {
        return <li> <a className="searchResult" onClick={this.addSearchResult.bind(this, searchResult)}> {searchResult.userName} </a> </li>;
      })}
    </ul>
  </div>
    );
    }
  }

  renderMembersToAdd() {
    if (this.state.membersToAdd.length) {
      return (
        <div>
        <ul style={{padding: 0, margin: 0, display: "inline-block"}} >
       {this.state.membersToAdd.map(function(member, index) {
        return (<li onClick={this.removeSearchResult.bind(this, member)} style={{cursor: "pointer", display: "inline-block", padding: 0.5 + "em", backgroundColor: "#EEE", borderRadius: 5 + "px", marginRight: 1 + "em"}}>
          {member.userName}
          </li>
        );
      }.bind(this))}
      </ul>
      <button onClick={this.addMembers} style={{marginLeft: 1 + "em", display: "inline-block"}} className="pure-button pure-button-primary">Add</button>
      </div>
    );
    }
  }

removeSearchResult(memberToRemove) {
  var newMembersToAdd = this.state.membersToAdd.slice();

  this.state.membersToAdd.forEach(function(member, index) {
    if (member._id === memberToRemove._id) {
      newMembersToAdd.splice(index, 1);
    }
  });

  this.setState({membersToAdd: newMembersToAdd});
}


addSearchResult (member) {
  var duplicate = false;
  if (this.state.membersToAdd.length) {
    this.state.membersToAdd.forEach(function(addedMember) {
      if (addedMember._id === member._id) {
        duplicate = true;
      }
    });
  }

  if (!duplicate) {
    this.setState({
      membersToAdd: this.state.membersToAdd.concat([member]),
      searchTerm: ""
    });
    document.getElementById('searchField').focus();
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

export default connect(mapStateToProps, { createTeam, searchUsers, addTeamMembers })(InviteTeamBox);
