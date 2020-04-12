import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { colors } from 'styles/constants';
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners';

import { setCurrentUser } from 'containers/BackendApiConnector/actions';
import { apiGet } from 'containers/BackendApiConnector/fetchers';
import FetchedContent from 'containers/FetchedContent';

import { currentUserSelector } from './selectors';

class CurrentUserLoader extends Component {
  constructor(props) {
    super(props);

    this.loadCurrentUser();
  }

  loadCurrentUser() {
    apiGet(
      {},
      {
        path: '/current_user',
        afterSuccess: (result) => {
          this.props.onLoadSuccess(result);
        },
      },
    );
  }

  render() {
    return (
      <FetchedContent
        processing={!this.props.currentUser}
        spinner={
          <FulfillingBouncingCircleSpinner color={colors.main} size={80} />
        }
      >
        {React.Children.only(this.props.children)}
      </FetchedContent>
    );
  }
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
