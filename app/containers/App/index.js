/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import Navbar from 'components/Navbar/index';
import Footer from 'components/Footer/index';
import Sidebar from 'components/Sidebar/index';
import { sidebarToggleSelector } from 'components/Sidebar/selectors';

import HomePage from 'containers/_pages/HomePage/Loadable';
import ProfilePage from 'containers/_pages/ProfilePage/Loadable';
import NotFoundPage from 'containers/_pages/NotFoundPage/Loadable';

import ContentWrapper from './ContentWrapper';

function App(props) {
  return (
    <div>
      <Navbar />
      <ContentWrapper
        className={props.sidebarCollapsed ? 'sidebar-collapsed' : ''}
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </ContentWrapper>
      <Sidebar />
    </div>
  );
}

App.propTypes = {
  sidebarCollapsed: PropTypes.bool.isRequired,
};

function mapStateToProps() {
  return createSelector(
    sidebarToggleSelector(),
    sidebarCollapsed => ({
      sidebarCollapsed,
    }),
  );
}

export default connect(mapStateToProps)(App);
