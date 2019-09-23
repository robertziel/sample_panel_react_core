import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwappingSquaresSpinner } from 'react-epic-spinners';
import FontAwesome from 'react-fontawesome';

import { colors } from 'styles/constants';
import { SubmitButton } from 'components/_ui-elements';

import { nullifyAuthenticationCredentials } from 'containers/BackendApiConnector/actions';
import { apiDelete } from 'containers/BackendApiConnector/fetchers';

import { signedOutNotify } from './notifications';
import Wrapper from './Wrapper';

class SignOutButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processing: false,
    };

    this.signOut = this.signOut.bind(this);
  }

  setStateProcessing() {
    this.setState({ processing: true });
  }

  unsetStateProcessing() {
    this.setState({ processing: false });
  }

  signOut(event) {
    event.preventDefault();

    apiDelete({
      component: this,
      disableRetry: true,
      path: '/auth/sign_out',
      afterSuccess: () => {
        this.props.onSignOutSuccess();
        signedOutNotify();
      },
    });
  }

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.signOut}>
          <SubmitButton
            navbar
            onSubmit={this.signOut}
            processing={this.state.processing}
            spinner={<SwappingSquaresSpinner color={colors.main} size={40} />}
          >
            <FontAwesome name="power-off" />
          </SubmitButton>
        </form>
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutSuccess: () => dispatch(nullifyAuthenticationCredentials()),
    dispatch,
  };
}

SignOutButton.propTypes = {
  onSignOutSuccess: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(SignOutButton);
