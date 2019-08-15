import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import ProfilePage from '../index';

describe('<ProfilePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ProfilePage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
