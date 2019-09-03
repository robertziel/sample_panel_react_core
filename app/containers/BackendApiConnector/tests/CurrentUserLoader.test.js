/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import { setAuthenticationToken } from '../actions';
import CurrentUserLoader from '../CurrentUserLoader';

const authenticationToken = 'a token';
const errorMessage = 'error message';
const currentUser = { name: 'User' };
const submitPath = '/current_user';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <CurrentUserLoader>
          <div className="application"></div>
        </CurrentUserLoader>
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  act(() => {
    store.dispatch(setAuthenticationToken(authenticationToken));
  });
});

describe('<CurrentUserLoader />', () => {
  context('when GET /current_user succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path: submitPath,
      responseBody: currentUser,
      status: 200,
    });

    beforeEach(() => {
      wrapper = mountWrapper();
    });

    it('should save new currentUser in redux store', async () => {
      await waitForExpect(() => {
        expect(store.getState().backendApiConnector.currentUser).toEqual(
          currentUser,
        );
      });
    });

    it('should render children', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.exists('.application')).toBe(true);
      });
    });
  });

  context('when GET /current_user not succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path: submitPath,
      responseBody: { error: errorMessage },
      status: 401,
    });

    it('should set authenticationToken to null', async () => {
      wrapper = mountWrapper();

      await waitForExpect(() => {
        expect(
          store.getState().backendApiConnector.authenticationToken,
        ).toEqual(null);
      });
    });
  });
});
