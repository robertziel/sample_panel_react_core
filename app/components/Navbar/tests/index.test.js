import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import Navbar from '../index';

describe('<Navbar />', () => {
  it('should render and match the snapshot', () => {
    const store = configureStore({}, browserHistory);

    const wrapper = mount(
      <IntlProvider locale="en">
        <Provider store={store}>
          <Navbar />
        </Provider>
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
