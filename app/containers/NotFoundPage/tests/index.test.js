import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <NotFoundPage />
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
