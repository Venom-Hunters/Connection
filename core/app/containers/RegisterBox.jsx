import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { reduxForm } from "redux-form";

import { register } from "../actions/index";

class RegisterBox extends Component {

  onSubmit(props) {
    this.props.register(props).then( () => {
      this.context.router.push("main");
    });
  }

  render() {
    const { fields: { email, userName, password }, handleSubmit } = this.props;

    return(
      <div className="registration">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" placeholder="E-Mail" {...email} />
            </div>

            <div className="pure-control-group">
              <label htmlFor="userName">Username</label>
              <input id="userName" placeholder="Username" {...userName} />
            </div>

            <div className="pure-control-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" {...password} />
            </div>

            <div className="pure-controls">
              <Link to="/" className="pure-button pure-button-secondary">Log in</Link>
              <button type="submit" className="pure-button pure-button-primary">Register</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

RegisterBox.contextTypes = {
  router: PropTypes.object
};

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: "RegisterBoxForm",
  fields: ["email", "userName", "password"],
  validate
}, null, { register })(RegisterBox);
