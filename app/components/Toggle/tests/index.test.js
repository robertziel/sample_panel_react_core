import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import Toggle from '../index';

const defaultEnMessage = 'someContent';
const defaultPlMessage = 'someOtherContent';

const messages = defineMessages({
  en: {
    id: 'app.components.LocaleToggle.en',
    defaultMessage: defaultEnMessage,
  },
  pl: {
    id: 'app.components..LocaleToggle.en',
    defaultMessage: defaultPlMessage,
  },
});

describe('<Toggle />', () => {
  let store;

  describe('render', () => {
    let wrapper;

    function mountWrapper(values) {
      return mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <Toggle values={values} messages={messages} />
          </IntlProvider>
        </Provider>,
      );
    }

    beforeAll(() => {
      store = configureStore({}, browserHistory);
    });

    it('should contain default text', () => {
      wrapper = mountWrapper(['en', 'pl']);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should not have ToggleOptions if props.values is not defined', () => {
      wrapper = mountWrapper(null);
      expect(wrapper.find('option')).toHaveLength(1);
      expect(
        wrapper
          .find('option')
          .first()
          .text(),
      ).toEqual('--');
    });
  });
});
