import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import AvatarForm from '../index';

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <AvatarForm />
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

describe('<AvatarForm />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should upload image via cropper', async () => {
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
  });
});
