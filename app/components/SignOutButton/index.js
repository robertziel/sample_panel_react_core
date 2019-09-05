import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwappingSquaresSpinner } from 'react-epic-spinners';
import FontAwesome from 'react-fontawesome';
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

  signOut() {
    this.setState({ processing: true });

    apiDelete({
      path: '/auth/sign_out',
      afterSuccess: () => {
        this.props.onSignOutSuccess();
        signedOutNotify();
      },
      afterError: () => {
        this.setState({ processing: false });
      },
    });
  }

  render() {
    const className = `sign-out${this.state.processing ? ' active' : ''}`;

    return (
      <Wrapper onClick={this.signOut} className={className}>
        {this.state.processing ? (
          <SwappingSquaresSpinner color="#00a9ff" size={40} />
        ) : (
          <FontAwesome name="power-off" />
        )}
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
