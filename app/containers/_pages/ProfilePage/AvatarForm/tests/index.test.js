import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';

import exampleImage from 'images/icon-512x512.png';
import AvatarForm from '../index';

const showPath = '/profile/avatar';
const showResponseBody = { avatar: exampleImage };

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
          <AvatarForm />
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

describe('<AvatarForm />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  loadApiFetchMock({
    method: 'GET',
    path: showPath,
    responseBody: showResponseBody,
    status: 200,
  });

  it('should upload image via cropper', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find('.file-input input').length).toBe(1);
    });
    const blob = new Blob(['foo'], { type: 'image/jpg' });
    wrapper.find('.file-input input').simulate('change', {
      target: {
        files: [blob],
      },
    });
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find('.MuiDialog-root button').length).toBe(1);
    });
    wrapper.find('.MuiDialog-root button').simulate('click', { button: 0 });
  }, 10000);
});
