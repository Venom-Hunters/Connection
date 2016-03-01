import React, { Component, PropTypes } from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
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
    this.setState({ 
      searchResults: this.props.searchResults,
      activeTeam: this.props.activeTeam,
      membersToAdd: this.props.activeTeam.members
    });
  }

  componentWillUnmount() {
    this.props.searchUsers('');
  }

  componentWillReceiveProps(props) {
    this.setState({ 
      searchResults: props.searchResults,
      activeTeam: props.activeTeam,
      membersToAdd: props.activeTeam.members
    });
  }

  render() {
    return(
      <div style={{margin: "0 auto"}} className="teamContent">
        <h2>Manage Team Members</h2>

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
    browserHistory.push('/home');
  }

  clearSearch() {
    this.setState({ searchTerm: "", searchResults: [] });
  }

  renderSearchList() {
    if(this.state.searchResults && Array.isArray(this.state.searchResults) && this.state.searchResults.length) {

      let activeIdArray = [];
      for (var i = 0; i < this.props.activeTeam.members.length; i++) {
        activeIdArray.push(this.props.activeTeam.members[i]._id);
      }
      
      return (
        <div>
          <h3> Search Results </h3>
          <ul style={{padding: 0, listStyle: "none"}}>

          {this.state.searchResults.map((searchResult) => {
            if (activeIdArray.indexOf(searchResult._id) === -1) {
              return <li key={searchResult._id}> <a className="searchResult" onClick={this.addSearchResult.bind(this, searchResult)}> {searchResult.userName} </a> </li>
            } else {
              return;
            }
          
          })}
          </ul>
        </div>
      );
    }
  }

  renderMembersToAdd() {
    if (this.state.membersToAdd) {
      return (
        <div>
          <ul style={{padding: 0, margin: 0, display: "inline-block"}} >
            {this.state.membersToAdd.map(function(member, index) {
              return (
                <li key={member._id} style={{ display: "inline-block", padding: 0.5 + "em", backgroundColor: "#EEE", borderRadius: 5 + "px", marginRight: 1 + "em", position: 'relative'}}>
                  {this.renderRemoveMemberIcon(member)}
                  {member.userName}

                </li>
              );
            }.bind(this))}
          </ul>
          <button onClick={this.addMembers} style={{marginTop: 1 + "em", display: "block"}} className="pure-button pure-button-primary">Update</button>
        </div>
      );
    }
  }

  renderRemoveMemberIcon(member) {
    if (member._id === this.props.user._id) {
      return;
    } else {
      return (
        <i onClick={this.removeSearchResult.bind(this, member)} className="zmdi zmdi-close-circle" style={{cursor: 'pointer', position: 'absolute', top: '-5px', left: '-5px', color: 'red'}}></i>
      );
    }
  }

  removeSearchResult(memberToRemove) {
    let newMembersToAdd = this.state.membersToAdd.slice();
    this.state.membersToAdd.forEach(function(member, index) {

      if (member._id === memberToRemove._id && member._id !== this.props.activeTeam.teamLead._id) {
        newMembersToAdd.splice(index, 1);
      }
    }.bind(this));
    
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
  return {activeTeam: state.teams.active, searchResults: state.userSearch, user: state.user};
}

export default connect(mapStateToProps, { createTeam, searchUsers, addTeamMembers })(InviteTeamBox);
