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

import CurrentUserLoader from './CurrentUserLoader';
import { authenticationTokenSelector } from './selectors';
import StoreAccessor from './StoreAccessor';

export class BackendApiConnector extends Component {
  constructor(props) {
    super(props);

    StoreAccessor.store = props.store;
  }

  render() {
    if (this.props.authenticationToken) {
      return (
        <CurrentUserLoader>
          {React.Children.only(this.props.children)}
        </CurrentUserLoader>
      );
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
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(BackendApiConnector);
