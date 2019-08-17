/* global context */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import SidebarLink from '../SidebarLink';

const linkSelector = 'a.sidebar-link';

const message = {
  id: 'sample.id',
  defaultMessage: 'Link name',
};

function mountWrapper(path) {
  return mount(
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={[path]}>
        <SidebarLink exact href="/path" text={message} fontAwesomeName="user" />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe('<SidebarLink />', () => {
  context('current path not exact as link', () => {
    const path = '/';

    it('should not be active', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(0);
      wrapper.unmount();
    });

    it('should change to active after click on link', () => {
      const wrapper = mountWrapper(path);
      wrapper.find('a[href="/path"]').simulate('click', { button: 0 });
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
      wrapper.unmount();
    });
  });

  context('current path exact as link', () => {
    const path = '/path';

    it('should be active', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
      wrapper.unmount();
    });
  });
});
