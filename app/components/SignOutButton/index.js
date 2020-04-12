import React, { useState } from 'react';
import { connect } from 'react-redux';
import useIsMounted from 'react-is-mounted-hook';
import PropTypes from 'prop-types';
import { SwappingSquaresSpinner } from 'react-epic-spinners';
import FontAwesome from 'react-fontawesome';

import { colors } from 'styles/constants';
import { SubmitButton } from 'components/_ui-elements';

import { nullifyAuthenticationCredentials } from 'containers/BackendApiConnector/actions';
import { apiDelete } from 'containers/BackendApiConnector/fetchers';

import { signedOutNotify } from './notifications';
import Wrapper from './Wrapper';

function SignOutButton({ onSignOutSuccess }) {
  const isMounted = useIsMounted();
  const [processing, setProcessing] = useState(false);

  const signOut = (event) => {
    event.preventDefault();

    apiDelete(
      { isMounted, setProcessing },
      {
        disableRetry: true,
        path: '/auth/sign_out',
        afterSuccess: () => onSignOutSuccess(),
      },
    );
  };

  return (
    <Wrapper>
      <form onSubmit={signOut}>
        <SubmitButton
          navbar
          processing={processing}
          spinner={<SwappingSquaresSpinner color={colors.main} size={40} />}
        >
          <FontAwesome name="power-off" />
        </SubmitButton>
      </form>
    </Wrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutSuccess: () => {
      dispatch(nullifyAuthenticationCredentials());
      signedOutNotify();
    },
    dispatch,
  };
}

SignOutButton.propTypes = {
  onSignOutSuccess: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SignOutButton);
