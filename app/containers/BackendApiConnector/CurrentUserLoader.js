import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import useIsMounted from 'react-is-mounted-hook';

import { colors } from 'styles/constants';
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners';

import { setCurrentUser } from 'containers/BackendApiConnector/actions';
import { apiGet } from 'containers/BackendApiConnector/fetchers';
import FetchedContent from 'containers/FetchedContent';

import { currentUserSelector } from './selectors';

function CurrentUserLoader({ children, currentUser, onLoadSuccess }) {
  const isMounted = useIsMounted();

  const loadCurrentUser = () => {
    apiGet(
      { isMounted },
      {
        path: '/current_user',
        afterSuccess: (result) => onLoadSuccess(result),
      },
    );
  };

  useEffect(() => loadCurrentUser(), []);

  return (
    <FetchedContent
      processing={!currentUser}
      spinner={
        <FulfillingBouncingCircleSpinner color={colors.main} size={80} />
      }
    >
      {React.Children.only(children)}
    </FetchedContent>
  );
}

function mapStateToProps() {
  return createSelector(currentUserSelector(), (currentUser) => ({
    currentUser,
  }));
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadSuccess: (currentUser) => dispatch(setCurrentUser(currentUser)),
    dispatch,
  };
}

CurrentUserLoader.propTypes = {
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.object,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserLoader);
