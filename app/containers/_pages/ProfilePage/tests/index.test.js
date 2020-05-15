import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ProfilePage from '../Loadable';
import Form from '../Form';

const indexPath = '/profile';
const email = 'test@gmail.com';
const username = 'username';
const responseBody = { profile: { email, username } };

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
}

describe('<ProfilePage />', () => {
  loadApiFetchMock({
    method: 'GET',
    path: indexPath,
    responseBody,
    status: 200,
  });

  beforeEach(() => {
    configureWrapper();
  });

  it('should render and match the snapshot', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(Form).props().user).toEqual(responseBody.profile);
    });
  });
});
