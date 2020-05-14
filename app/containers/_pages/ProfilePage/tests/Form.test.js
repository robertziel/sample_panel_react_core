import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Form from '../Form';

const indexPath = '/profile';
const updatePath = indexPath;
const email = 'test@gmail.com';
const username = 'username';
const userObject = { email, username };

let store;
let wrapper;

const fetchMock = (responseBody) => {
  loadApiFetchMock({
    method: 'POST',
    path: updatePath,
    requestBody: { email, password: null, username },
    responseBody,
    status: 200,
  });
};

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <Form user={userObject} />
      </Provider>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
  return wrapper;
}

async function submitForm() {
  await act(async () => {
    wrapper.find('button[type="submit"]').simulate('submit');
  });
}

describe('<Form />', () => {});
