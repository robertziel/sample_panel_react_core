/*
 * BackendApiConnector
 *
 * This component is an intermediary between application and API
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import SignInPage from 'containers/authPages/SignInPage/Loadable';

import { authenticationTokenSelector } from './selectors';

class BackendApiConnector extends Component {
  render() {
    if (this.props.authenticationToken) {
      return React.Children.only(this.props.children);
    }
    return <SignInPage />;
  }
}

function mapStateToProps() {
  return createSelector(
    authenticationTokenSelector(),
    authenticationToken => ({
      authenticationToken,
    }),
  );
}

BackendApiConnector.propTypes = {
  authenticationToken: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(BackendApiConnector);
