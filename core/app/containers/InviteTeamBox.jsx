import React, { Component, PropTypes } from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { createTeam, searchUsers, addTeamMembers, getUserTeams, addMembersToUpdate,clearMembersToUpdate } from "../actions/index";

class InviteTeamBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResults: [],
      membersToUpdate: [],
      membersToAdd: []
    };

    this.onChange = this.onChange.bind(this);
    this.renderMembersToUpdate = this.renderMembersToUpdate.bind(this);
    /*this.removeSearchResult = this.removeSearchResult.bind(this);*/
    this.addMembers = this.addMembers.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchField').focus();
    this.setState({ 
      searchResults: this.props.searchResults
    });
    if (this.props.activeTeam._id) {
      this.setState({
        membersToUpdate: this.props.activeTeam.members
      })
    }
  }

  componentWillUnmount() {
    this.props.clearMembersToUpdate();
    this.props.searchUsers('');
  }

  componentWillReceiveProps(props) {
    this.setState({ 
      searchResults: props.searchResults
    });

    if (props.membersToAdd.length && this.props.activeTeam.members) {
      this.setState({
        membersToUpdate: this.props.activeTeam.members.concat(props.membersToAdd)
      })
    } else {
      this.setState({
        membersToUpdate: this.props.activeTeam.members
      })
    }
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

        {this.renderMembersToUpdate()}
        {this.renderSearchList()}

      </div>
    );
  }

  addMembers() {
    this.props.addTeamMembers(this.props.activeTeam._id, this.state.membersToUpdate).then(function() {
      this.props.getUserTeams();
      let oldMemberIdArray = this.props.activeTeam.members.map((member) => {
        return member._id;
      })
      let updatedMemberIdArray = this.state.membersToUpdate.map((member) => {
        return member._id;
      })
      let membersToNotify = _.union(oldMemberIdArray, updatedMemberIdArray);
      this.props.socket.emit('UPDATE_MEMBERS', membersToNotify);
    }.bind(this));
    browserHistory.push('/team/chat');
  }

  clearSearch() {
    this.setState({ searchTerm: "", searchResults: [] });
  }

  renderSearchList() {
    if(this.state.searchResults && Array.isArray(this.state.searchResults) && this.state.searchResults.length) {

      let activeIdArray = [];
      for (var i = 0; i < this.state.membersToUpdate.length; i++) {
        activeIdArray.push(this.state.membersToUpdate[i]._id);
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

  renderMembersToUpdate() {
    if (this.state.membersToUpdate && this.state.membersToUpdate.length) {
      return (
        <div>
          <ul style={{padding: 0, margin: 0, display: "inline-block"}} >
            {this.state.membersToUpdate.map(function(member, index) {
              return (
                <li key={member._id} style={{ display: "inline-block", padding: 0.5 + "em", backgroundColor: "#EEE", borderRadius: 5 + "px", marginRight: 1 + "em", marginBottom: '1em', position: 'relative'}}>
                  {this.renderRemoveMemberIcon(member)}
                  {member.userName}
                </li>
              );
            }.bind(this))}
          </ul>
          <div>
            <button onClick={this.addMembers} className="pure-button pure-button-primary" style={{marginRight: '1em'}}>Update</button>
            <Link to='/team/chat' className="pure-button pure-button-secondary" style={{marginRight: '1em'}}>Cancel</Link>
          </div>
        </div>
      );
    } else {
      return;
    }
  }

  renderRemoveMemberIcon(member) {
    if (member._id === this.props.user._id) {
      return;
    } else {
      return (
        <i onClick={this.removeMember.bind(this, member)} className="zmdi zmdi-close-circle" style={{cursor: 'pointer', position: 'absolute', top: '-5px', right: '-5px', color: 'red'}}></i>
      );
    }
  }

  removeMember(memberToRemove) {
    let newMembersToAdd = this.state.membersToUpdate.slice();

    this.state.membersToUpdate.forEach(function(member, index) {
      if (member._id === memberToRemove._id && member._id !== this.props.activeTeam.teamLead._id) {
        newMembersToAdd.splice(index, 1);
      }
    }.bind(this));

    this.setState({membersToUpdate: newMembersToAdd});
  }
    

  addSearchResult (member) {    
    var duplicate = false;
    if (this.state.membersToUpdate.length) {
      this.state.membersToUpdate.forEach(function(addedMember) {
        if (addedMember._id === member._id) {
          duplicate = true;
        }
      });
    }

    if (!duplicate) {
      this.setState({
        searchTerm: ""
      });
      this.props.addMembersToUpdate(member)
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
  return {activeTeam: state.teams.active, searchResults: state.userSearch.searchResults, user: state.user, membersToAdd: state.userSearch.membersToAdd, socket: state.user.socket};
}

export default connect(mapStateToProps, { createTeam, searchUsers, addTeamMembers, getUserTeams, addMembersToUpdate, clearMembersToUpdate })(InviteTeamBox);
