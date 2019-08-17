/* global context */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import SidebarCollapseLinks from '../SidebarCollapseLinks';

const buttonSelector = 'button.sidebar-link';
const linkSelector = 'a.sidebar-link';

const message = {
  id: 'sample.id',
  defaultMessage: 'Link name',
};

function mountWrapper(path) {
  return mount(
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={[path]}>
        <SidebarCollapseLinks
          text={message}
          fontAwesomeName="home"
          links={[
            { exact: true, href: '/route-1', text: message },
            { exact: true, href: '/route-2', text: message },
          ]}
        />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe('<SidebarCollapseLinks />', () => {
  context('current path not included in any link', () => {
    const path = '/';

    it('should not be active', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(0);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(0);
      wrapper.unmount();
    });

    it('should change to active after click on link', () => {
      const wrapper = mountWrapper(path);
      wrapper.find(buttonSelector).simulate('click');
      wrapper.find('a[href="/route-1"]').simulate('click', { button: 0 });
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(1);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
      wrapper.unmount();
    });

    context('should not be collapsed', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(0);
      wrapper.unmount();
    });

    it('should change to collapsed after click on button', () => {
      const wrapper = mountWrapper(path);
      wrapper.find(buttonSelector).simulate('click');
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(1);
      wrapper.unmount();
    });
  });

  context('current path exact to any link', () => {
    const path = '/route-1';

    it('should be active', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(1);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
      wrapper.unmount();
    });

    context('should be collapsed', () => {
      const wrapper = mountWrapper(path);
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(1);
      wrapper.unmount();
    });
  });
});
