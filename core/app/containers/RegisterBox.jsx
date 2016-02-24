import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import { register } from '../actions/index';

class RegisterBox extends Component {

  onSubmit(props) {
    this.props.register(props);
  }

  render() {
    const { fields: { email, username, password }, handleSubmit } = this.props;

    return(
      <div className="registration">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" placeholder="E-Mail" {...email} />
            </div>

            <div className="pure-control-group">
              <label htmlFor="username">Username</label>
              <input id="username" placeholder="Username" {...username} />
            </div>

            <div className="pure-control-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" {...password} />
            </div>

            <div className="pure-controls">
              <Link to="/login" className="pure-button pure-button-secondary">Log in</Link>
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
  form: 'RegisterBoxForm',
  fields: ['email', 'username', 'password'],
  validate
}, null, { register })(RegisterBox);
