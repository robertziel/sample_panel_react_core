import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import styled from 'styled-components';
import { colors } from 'styles/constants';
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners';

import {
  nullifyAuthenticationCredentials,
  setCurrentUser,
} from 'containers/BackendApiConnector/actions';
import { apiGet } from 'containers/BackendApiConnector/fetchers';

import { currentUserSelector } from './selectors';

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;

  div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

class CurrentUserLoader extends Component {
  constructor(props) {
    super(props);

    this.loadCurrentUser();
  }

  loadCurrentUser() {
    apiGet({
      path: '/current_user',
      afterSuccess: result => {
        if (result.error) {
          this.props.onLoadFail();
          return;
        }
        this.props.onLoadSuccess(result);
      },
    });
  }

  render() {
    if (this.props.currentUser) {
      return React.Children.only(this.props.children);
    }
    return (
      <SpinnerWrapper>
        <FulfillingBouncingCircleSpinner color={colors.main} size={80} />
      </SpinnerWrapper>
    );
  }
}

function mapStateToProps() {
  return createSelector(
    currentUserSelector(),
    currentUser => ({
      currentUser,
    }),
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadFail: () => dispatch(nullifyAuthenticationCredentials()),
    onLoadSuccess: currentUser => dispatch(setCurrentUser(currentUser)),
    dispatch,
  };
}

CurrentUserLoader.propTypes = {
  children: PropTypes.element.isRequired,
  currentUser: PropTypes.object,
  onLoadFail: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentUserLoader);
