import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { mount } from 'enzyme';

import { changeLocale } from 'containers/LanguageProvider/actions';
import LanguageProvider from 'containers/LanguageProvider';
import configureStore from 'configureStore';
import { translationMessages } from 'i18n';

import LocaleToggle, { mapDispatchToProps } from '../index';

describe('<LocaleToggle />', () => {
  let store;

  function mountWrapper() {
    return mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
  }

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  describe('render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountWrapper();
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it('should match the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should present the default `en` english language option', () => {
      expect(wrapper.find('option[value="en"]')).not.toBeNull();
    });
  });

  describe('mapDispatchToProps', () => {
    describe('onLanguageToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLanguageToggle).toBeDefined();
      });

      it('should dispatch changeLocale when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const locale = 'de';
        const evt = { target: { value: locale } };
        result.onLanguageToggle(evt);
        expect(dispatch).toHaveBeenCalledWith(changeLocale(locale));
      });
    });
  });
});
