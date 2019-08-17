import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Footer from '../index';

const renderer = new ShallowRenderer();

describe('<Footer />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<Footer />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
