import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { reduxForm } from "redux-form";

import { login } from "../actions/";

class LoginBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(props) {
    this.props.login(props)
    .then( (response) => {
      if (response.error) {
        this.setState({
          error: 'Incorrect username and/or password.'
        });
      } else if (this.props.user && this.props.user._id) {
          this.context.router.push("/team/chat");
      }
    });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

    return(
      <div className="registrationContainer">
      <div className="registration">
        <div className="registrationLogo"> <img src="../../../assets/img/reylink-logo-sm.png" /> </div>
        
        <div className="registrationErrorMessage">{this.state.error ? this.state.error : ""}</div>



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
              <button type="submit" className="pure-button pure-button-primary" style={{marginRight: '1em'}}>Log in</button>
              <Link to="register" className="pure-button pure-button-secondary">Register</Link>
            </div>

          </fieldset>
        </form>

      </div>

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

function mapStateToProps(state) {
  return {
    user: state.user
  };

}

export default reduxForm({
  form: "LoginForm",
  fields: ["email", "password"],
  validate
}, mapStateToProps, { login })( LoginBox );
