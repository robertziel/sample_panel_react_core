import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

export default function CommonLinkContent(props) {
  return (
    <div>
      <FontAwesome name={props.fontAwesomeName} />
      <FormattedMessage {...props.text} />
    </div>
  );
}

CommonLinkContent.propTypes = {
  fontAwesomeName: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};
