/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import UsersPage from '../Loadable';

const indexPath = '/users';
const email = 'test@gmail.com';
const username = 'username';
const users = [
  {
    id: 1,
    email,
    username,
  },
];

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <UsersPage />
      </Provider>
    </IntlProvider>,
  );
}

function configureWrapper() {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
  return wrapper;
}

describe('<UsersPage />', () => {
  context('when GET /users succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path: indexPath,
      responseBody: users,
      status: 200,
    });

    beforeEach(() => {
      configureWrapper();
    });

    it('should list users', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(email);
        expect(wrapper.text()).toContain(username);
      });
    });
  });
});
