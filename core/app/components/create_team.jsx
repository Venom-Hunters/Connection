import _ from 'lodash';
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { reduxForm } from "redux-form";
import { createTeam, findPotentialMembers } from "../actions/index";

class CreateTeamBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberArray: [],
      teamMemberHolder: ''
    };
    this.handleAddMemberChange = this.handleAddMemberChange.bind(this);
    
  }

  handleAddMemberChange(value) {
    const search = {
      searchParams: value
    }
    this.props.findPotentialMembers(search);
  }

  renderPotentialMembers() {
    if (!this.props.potentialTeamMembers) {
      return;
    }

    return this.props.potentialTeamMembers.map((member) => {
      if (this.state.memberArray.length > 0) {
        for (var i = 0; i < this.state.memberArray.length; i++) {
          if (member._id === this.state.memberArray[i]._id) {
            return;
          } else {
            return (
              <div onClick={this.addTeamMember.bind(this, member)} key={member._id} style={{cursor: 'pointer'}}><i className="zmdi zmdi-plus-circle-o"></i> {member.userName}</div>
            );
          }
        }  
      } else {
        return (
          <div key={member._id}><i onClick={this.addTeamMember.bind(this, member)} className="zmdi zmdi-plus-circle-o"></i> {member.userName}</div>
        );
      }
      
      
    })
  }

  addTeamMember(member, event) {
      this.setState({
        memberArray: [...this.state.memberArray,member]
      });
      this.handleAddMemberChange('');
      this.clearSearchBar();
  }

  removeTeamMember(member, event) {
    
    this.setState({
      memberArray: this.state.memberArray.filter((_, i) => i !== this.state.memberArray.findIndex(
        (foundMember) => {
          if(foundMember._id === member._id){
            return true;
          }
      }))
    })
  }

  updateSearchBar(event) {
    this.setState({
      teamMemberHolder: event
    })
  }

  clearSearchBar() {
    this.setState({
      teamMemberHolder: ''
    })
  }

  renderTeamMemberList() {
    return this.state.memberArray.map((member) => {
      return (
        <div key={member._id}><i onClick={this.removeTeamMember.bind(this, member)} className="zmdi zmdi-minus-circle-outline"></i> {member.userName}</div>
      )
    })
  }

  onSubmit(props) {
    
    var newTeam = {
      teamName: props.teamName,
      teamMembers: this.state.memberArray
    }
    console.log(newTeam);
   /* this.props.createTeam(newTeam).then( () => {
      this.context.router.push("/main");
    });*/
  }


  render() {

    const { fields: { teamName }, handleSubmit } = this.props;

    const memberSearch = _.debounce((value) => {this.handleAddMemberChange(value)}, 800);

    return(
      <div className="teamStuff">
        <h1 style={{marginBottom: '-10px'}}>Create A New Team</h1>
        <p style={{fontStyle: 'italic', textAlign: 'center'}}>Add a team name, search for and click on members to add to team if desired, and then click the 'Create Team' button. You can always add team members later.</p>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="pure-form pure-form-aligned" style={{borderBottom: '1px solid #7c7c7c'}}>
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="teamName">Team Name:</label>
              <input id="teamName" type="text" placeholder="Team Name..." {...teamName} />
            </div>
            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Create Team</button>
              <Link to="/main" className="pure-button pure-button-secondary">Cancel</Link>
            </div>
          </fieldset>
        </form>
        <form onSubmit={(event) => event.preventDefault()} className="pure-form pure-form-aligned" style={{borderBottom: '1px solid #7c7c7c', marginTop: '10px'}}>
          <div className="pure-control-group">
            <label>Search For Member:</label>
            <input id="addMember" placeholder="Search For Member..." onChange={(event) => {this.updateSearchBar(event.target.value); memberSearch(event.target.value)}} value={this.state.teamMemberHolder} /> 
          </div>
        </form>
        <div style={{display: 'flex', width: '100%', border: '1px solid blue', textAlign: 'center'}}>
          <div style={{flex: '1', border: '1px solid blue'}}>
            <h3 style={{textDecoration: 'underline'}}>Potential Members:</h3>
            <div>{this.renderPotentialMembers()}</div>
          </div>
          <div style={{flex: '1', border: '1px solid blue'}}>
            <h3 style={{textDecoration: 'underline'}}>Members to add:</h3>
            <div>{this.renderTeamMemberList()}</div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTeamBox.contextTypes = {
  router: PropTypes.object
};

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  return {potentialTeamMembers: state.potentialTeamMembers};
}

export default reduxForm({
  form: "CreateTeamForm",
  fields: ["teamName"],
  validate
}, mapStateToProps, { createTeam, findPotentialMembers })(CreateTeamBox);
