import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

import { setAuthenticationToken } from 'containers/BackendApiConnector/actions';
import { apiPost } from 'containers/BackendApiConnector/fetchers';

import messages from './messages';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      email: null,
      password: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    apiPost({
      path: '/auth/sign_in',
      body: {
        email: this.state.email,
        password: this.state.password,
      },
      afterSuccess: result => {
        this.setState({ errorMessage: result.error_message });

        if (result.authentication_token) {
          this.props.onSignInSuccess(result.authentication_token);
        }
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="error-message">{this.state.errorMessage}</div>
        <div className="field-line">
          <TextField
            label={<FormattedMessage {...messages.formEmail} />}
            type="email"
            name="email"
            onChange={event => this.setState({ email: event.target.value })}
            variant="filled"
          />
        </div>
        <div className="field-line">
          <TextField
            label={<FormattedMessage {...messages.formPassword} />}
            type="password"
            name="password"
            onChange={event => this.setState({ password: event.target.value })}
            variant="filled"
          />
        </div>
        <Button type="submit" variant="outlined">
          <FormattedMessage {...messages.formButton} />
        </Button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignInSuccess: token => dispatch(setAuthenticationToken(token)),
    dispatch,
  };
}

Form.propTypes = {
  onSignInSuccess: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(Form);
