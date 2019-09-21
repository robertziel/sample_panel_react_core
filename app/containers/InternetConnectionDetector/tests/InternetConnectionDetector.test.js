/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';

import NotificationSystem from 'containers/NotificationsSystem';

import InternetConnectionDetector, { isOnline } from '../index';
import messages from '../messages';

const eventListeners = {};
window.addEventListener = jest.fn((event, cb) => {
  eventListeners[event] = cb;
});

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <div>
        <NotificationSystem />
        <InternetConnectionDetector>
          <div className="content"></div>
        </InternetConnectionDetector>
      </div>
    </IntlProvider>,
  );
}

let onLineGetter;
let wrapper;

beforeAll(() => {
  onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get');
});

describe('<InternetConnectionDetector />', () => {
  context('when connected to internet before mount', () => {
    beforeEach(() => {
      onLineGetter.mockReturnValue(true);
      wrapper = mountWrapper();
    });

    it('should render content', () => {
      expect(wrapper.exists('.content')).toBe(true);
    });

    it('isOnline() should return true', () => {
      expect(isOnline()).toBe(true);
    });

    it('should render not render internetConnectionBackNotify', () => {
      expect(wrapper.text()).not.toContain(
        messages.internetConnectionBackNotify.defaultMessage,
      );
    });

    context('and internet disconnected', () => {
      beforeEach(() => {
        onLineGetter.mockReturnValue(false);
        eventListeners.offline();
      });

      it('isOnline() should return true', () => {
        expect(isOnline()).toBe(false);
      });

      it('should render noInternetConnectionNotify', () => {
        expect(wrapper.text()).toContain(
          messages.noInternetConnectionNotify.defaultMessage,
        );
      });
    });
  });

  context('when not connected to internet before mount', () => {
    beforeEach(() => {
      onLineGetter.mockReturnValue(false);
      wrapper = mountWrapper();
    });

    it('should render content', () => {
      expect(wrapper.exists('.content')).toBe(true);
    });

    it('should render noInternetConnectionNotify', () => {
      expect(wrapper.text()).toContain(
        messages.noInternetConnectionNotify.defaultMessage,
      );
    });

    context('and connected back to internet', () => {
      beforeEach(() => {
        onLineGetter.mockReturnValue(true);
        eventListeners.online();
      });

      it('isOnline() should return true', () => {
        expect(isOnline()).toBe(true);
      });

      it('should render internetConnectionBackNotify', () => {
        expect(wrapper.text()).toContain(
          messages.internetConnectionBackNotify.defaultMessage,
        );
      });

      it('should remove noInternetConnectionNotify', () => {
        wrapper.update();
        expect(
          wrapper.exists(
            `.notification-hidden .notification-message span[children="${messages.noInternetConnectionNotify.defaultMessage}"]`,
          ),
        ).toBe(true);
      });
    });
  });
});
