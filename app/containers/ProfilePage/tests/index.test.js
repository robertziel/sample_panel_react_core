import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import ProfilePage from '../index';

describe('<ProfilePage />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProfilePage />
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
