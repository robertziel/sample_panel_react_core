/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import { apiGet } from '../fetchers';
import messages from '../messages';

const path = '/';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <NotificationSystem />
    </IntlProvider>,
  );
}

let wrapper;

beforeEach(() => {
  /* eslint-disable no-new */
  new ConfigureTestStore();
  /* eslint-enable no-new */
  wrapper = mountWrapper();
});

describe('apiFetch()', () => {
  context('when fetch not succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path,
      throws: { message: 'ERR_SERVER_CONNECTION' },
    });

    beforeEach(() => {
      apiGet({ path });
    });

    it('should notify that cannot connect to the server', async () => {
      await waitForExpect(() => {
        expect(wrapper.text()).toContain(
          messages.connectionRefusedNotify.defaultMessage,
        );
      });
    });
  });
});
