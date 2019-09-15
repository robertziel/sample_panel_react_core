import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Note, Grid, TextField } from 'components/_ui-elements';
import { HollowDotsSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

import { setAuthenticationToken } from 'containers/BackendApiConnector/actions';
import { apiPost } from 'containers/BackendApiConnector/fetchers';

import messages from './messages';
import { signedInNotify } from './notifications';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      email: null,
      password: null,
      disabled: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  disable() {
    this.setState({ disabled: true });
  }

  enable() {
    this.setState({ disabled: false });
  }

  onSubmit(event) {
    event.preventDefault();

    apiPost({
      form: this,
      path: '/auth/sign_in',
      body: {
        email: this.state.email,
        password: this.state.password,
      },
      afterSuccess: result => {
        this.setState({ errorMessage: result.error_message });

        if (result.authentication_token) {
          this.props.onSignInSuccess(result.authentication_token);
          signedInNotify();
        }
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Grid>
          <Note error message={this.state.errorMessage} />
        </Grid>
        <Grid>
          <TextField
            label={<FormattedMessage {...messages.formEmail} />}
            type="email"
            name="email"
            onChange={event => this.setState({ email: event.target.value })}
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField
            label={<FormattedMessage {...messages.formPassword} />}
            type="password"
            name="password"
            onChange={event => this.setState({ password: event.target.value })}
            variant="outlined"
          />
        </Grid>
        <Grid>
          <Button
            type="submit"
            variant="outlined"
            disabled={this.state.disabled}
          >
            {this.state.disabled ? (
              <HollowDotsSpinner
                color={colors.main}
                size={24}
                animationDelay={-100}
              />
            ) : (
              <FormattedMessage {...messages.formButton} />
            )}
          </Button>
        </Grid>
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
