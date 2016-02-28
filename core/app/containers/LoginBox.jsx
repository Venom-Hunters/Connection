import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { reduxForm } from "redux-form";

import { login } from "../actions/";

class LoginBox extends Component {
  onSubmit(props) {
    this.props.login(props).then( () => {
      this.context.router.push("/home");
    });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

    return(
      <div className="registration">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}  className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" placeholder="E-Mail" {...email} />
            </div>

            <div className="pure-control-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" {...password} />
            </div>

            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Log in</button>
              <Link to="register" className="pure-button pure-button-secondary">Register</Link>
            </div>

          </fieldset>
        </form>
      </div>
    );
  }
}

LoginBox.contextTypes = {
  router: PropTypes.object
};

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: "LoginForm",
  fields: ["email", "password"],
  validate
}, null, { login })( LoginBox );
