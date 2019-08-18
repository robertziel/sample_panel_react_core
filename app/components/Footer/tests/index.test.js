import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <Footer />
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
