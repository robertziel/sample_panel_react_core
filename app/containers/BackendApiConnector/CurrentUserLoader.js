import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import {
  nullifyAuthenticationCredentials,
  setCurrentUser,
} from 'containers/BackendApiConnector/actions';
import { apiGet } from 'containers/BackendApiConnector/fetchers';

import { currentUserSelector } from './selectors';

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
    return <h1>Loading...</h1>;
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
