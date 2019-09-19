import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/_ui-elements/Button';
import { HollowDotsSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

function SubmitButton(props) {
  const spinner = props.spinner || (
    <HollowDotsSpinner color={colors.main} size={24} animationDelay={-100} />
  );

  return (
    <Button type="submit" disabled={props.processing} navbar={props.navbar}>
      {props.processing ? spinner : props.children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  navbar: PropTypes.bool,
  processing: PropTypes.bool,
  spinner: PropTypes.element,
};

export default SubmitButton;
