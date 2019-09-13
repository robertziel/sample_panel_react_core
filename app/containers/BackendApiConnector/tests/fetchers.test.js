/* global context */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import { setAuthenticationToken } from '../actions';
import { apiGet } from '../fetchers';
import messages from '../messages';

const locale = 'en';
const path = '/';
const token = 'a token';

function mountWrapper() {
  return mount(
    <IntlProvider locale={locale}>
      <Provider store={store}>
        <NotificationSystem />
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
});

describe('apiFetch()', () => {
  it('Language-Locale header must be included', () => {
    fetchMock.mock((url, opts) => opts.headers['Language-Locale'] === locale, {
      status: 200,
    });
    apiGet({ path });
    fetchMock.restore();
  });

  it('Authentication-Token header must be included', () => {
    act(() => {
      store.dispatch(setAuthenticationToken(token));
    });
    fetchMock.mock(
      (url, opts) => opts.headers['Authentication-Token'] === token,
      {
        status: 200,
      },
    );
    apiGet({ path });
    fetchMock.restore();
  });

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
