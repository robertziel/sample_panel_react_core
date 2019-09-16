import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/_ui-elements/Button';
import { HollowDotsSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

function SubmitButton(props) {
  return (
    <Button type="submit" variant="outlined" disabled={props.disabled}>
      {props.disabled ? (
        <HollowDotsSpinner
          color={colors.main}
          size={24}
          animationDelay={-100}
        />
      ) : (
        props.children
      )}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
};

export default SubmitButton;
