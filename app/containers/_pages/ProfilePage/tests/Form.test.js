/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Form from '../Form';
import messages from '../messages';

const updatePath = '/profile';
const email = 'test@gmail.com';
const username = 'username';
const userObject = { email, username };
const emailUpdated = 'test2@gmail.com';
const usernameUpdated = 'username2';
const passwordUpdated = 'newPassword';
const passwordConfirmationUpdated = passwordUpdated;

const userObjectUpdated = {
  email: emailUpdated,
  password: passwordUpdated,
  password_confirmation: passwordConfirmationUpdated,
  username: usernameUpdated,
};

const errorMessages = {
  username: 'Username error',
  email: 'Email error',
  password: 'Password error',
  password_confirmation: 'Password confirmation error',
};

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
          <Form user={userObject} />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
}

function fillInAndSubmitForm() {
  wrapper
    .find('input[name="email"]')
    .simulate('change', { target: { value: emailUpdated } });
  wrapper
    .find('input[name="username"]')
    .simulate('change', { target: { value: usernameUpdated } });
  wrapper
    .find('input[name="password"]')
    .simulate('change', { target: { value: passwordUpdated } });
  wrapper
    .find('input[name="password_confirmation"]')
    .simulate('change', { target: { value: passwordConfirmationUpdated } });

  wrapper.find('button[type="submit"]').simulate('submit');
}

beforeEach(() => {
  configureWrapper();
});

describe('<Form />', () => {
  context('when update succeeded', () => {
    loadApiFetchMock({
      method: 'POST',
      path: updatePath,
      requestBody: userObjectUpdated,
      responseBody: { profile: {} },
      status: 200,
    });

    it('should add success notification', async () => {
      fillInAndSubmitForm();
      await waitForExpect(() => {
        expect(wrapper.text()).toContain(
          messages.profileUpdateSucceededNotify.defaultMessage,
        );
      });
    });
  });

  context('when update not succeeded', () => {
    loadApiFetchMock({
      method: 'POST',
      path: updatePath,
      requestBody: userObjectUpdated,
      responseBody: { error_messages: errorMessages },
      status: 401,
    });

    it('should render an error messages with notification', async () => {
      fillInAndSubmitForm();
      waitForExpect(() => {
        wrapper.update();
        Object.keys(errorMessages).each((key) => {
          expect(wrapper.contains(errorMessages[key])).toEqual(true);
        });
        expect(
          wrapper.contains(messages.profileUpdateFailedNotify.defaultMessage),
        ).toEqual(true);
      });
    });
  });
});
