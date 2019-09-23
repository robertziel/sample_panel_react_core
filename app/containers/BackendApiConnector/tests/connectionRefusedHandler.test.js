/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';

import NotificationSystem from 'containers/NotificationsSystem';

import {
  reportConnectionRefused,
  reportConnectionSucceeded,
} from '../connectionRefusedHandler';

import messages from '../messages';

const errorRefusedNotifySelector = `.notification:not(.notification-hidden) .notification-message span[children="${messages.connectionRefusedNotify.defaultMessage}"]`;
const mockFunction = jest.fn(() => {});

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <NotificationSystem />
    </IntlProvider>,
  );
}
let wrapper;

beforeAll(() => {
  wrapper = mountWrapper();
});

describe('<connectionRefusedHandler />', () => {
  context('reportConnectionRefused()', () => {
    context('notification without queued fetches exists', () => {
      beforeEach(() => {
        reportConnectionRefused();
      });

      it('should not add new notification', () => {
        reportConnectionRefused();
        wrapper.update();
        expect(wrapper.find(errorRefusedNotifySelector).length).toBe(1);
      });

      // TODO: Should render retry button only if refetch queue not empty
    });

    context('notification does not exist', () => {
      it('should render notification', () => {
        reportConnectionRefused();
        wrapper.update();
        expect(wrapper.exists(errorRefusedNotifySelector)).toBe(true);
      });
    });
  });

  context('reportConnectionSucceeded()', () => {
    context('notification without queued fetches exists', () => {
      beforeEach(() => {
        reportConnectionRefused();
      });

      it('should remove error notification', () => {
        reportConnectionSucceeded();
        wrapper.update();
        expect(wrapper.exists(errorRefusedNotifySelector)).toBe(false);
      });

      it('should make possible to rerender notification on next connection refused', () => {
        reportConnectionSucceeded();
        reportConnectionRefused();
        wrapper.update();
        expect(wrapper.exists(errorRefusedNotifySelector)).toBe(true);
      });

      context('when queued fetches added', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          reportConnectionRefused(mockFunction());
          reportConnectionRefused(mockFunction());
        });

        it('should shift and call all queued fetches', () => {
          reportConnectionSucceeded();
          expect(mockFunction).toHaveBeenCalledTimes(2);

          reportConnectionRefused();
          reportConnectionSucceeded();
          expect(mockFunction).toHaveBeenCalledTimes(2);
        });
      });
    });

    context('notification does not exist', () => {
      it('should do nothing', () => {
        const htmlBefore = wrapper.html();
        reportConnectionSucceeded();
        wrapper.update();
        expect(wrapper.html()).toBe(htmlBefore);
      });
    });
  });
});
