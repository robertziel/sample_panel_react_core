/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import {
  setAuthenticationToken,
  setCurrentUser,
} from 'containers/BackendApiConnector/actions';
import SignOutButton from '../index';

const authenticationToken = 'a token';
const currentUser = { name: 'User' };
const submitPath = '/auth/sign_out';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <SignOutButton />
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
  act(() => {
    store.dispatch(setCurrentUser(currentUser));
    store.dispatch(setAuthenticationToken(authenticationToken));
  });
});

describe('<SignOutButton />', () => {
  context('onClick', () => {
    context('when fetch succeeded', () => {
      loadApiFetchMock({
        method: 'DELETE',
        path: submitPath,
        responseBody: {},
        status: 200,
      });

      it('should nullify backendApiConnector credentials', async () => {
        wrapper.find('div.sign-out').simulate('click');

        await waitForExpect(() => {
          expect(
            store.getState().backendApiConnector.authenticationToken,
          ).toEqual(null);
          expect(store.getState().backendApiConnector.currentUser).toEqual(
            null,
          );
        });
      });
    });
  });
});
