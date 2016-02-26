import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { reduxForm } from "redux-form";
import { addTeamMember } from "../actions/index";

class AddMemberBox extends Component {

  onSubmit(props) {
   /* this.props.register(props).then( () => {
      this.context.router.push("main");
    });*/
  }

  render() {
    const { fields: { newMember }, handleSubmit } = this.props;

    return(
      <div className="teamStuff">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="newMember">Member Name/Email</label>
              <input id="newMember" type="text" placeholder="Member Name/Email..." {...newMember} />
            </div>

            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Add Member</button>
              <Link to="/main" className="pure-button pure-button-secondary">Cancel</Link>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddMemberBox.contextTypes = {
  router: PropTypes.object
};

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: "AddMemberForm",
  fields: ["newMember"],
  validate
}, null, { addTeamMember })(AddMemberBox);
