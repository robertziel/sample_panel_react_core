import React from 'react';
import { render } from '@testing-library/react';
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
