import React from 'react';
import PropTypes from 'prop-types';

import { SelfBuildingSquareSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

import Wrapper from './Wrapper';

function FetchedContent(props) {
  const spinner = props.spinner || (
    <SelfBuildingSquareSpinner color={colors.main} size={40} />
  );

  const wrappedSpinner = props.tableRow ? (
    <tr>
      <td>
        <Wrapper>{spinner}</Wrapper>
      </td>
    </tr>
  ) : (
    <Wrapper>{spinner}</Wrapper>
  );

  return props.processing ? wrappedSpinner : props.children;
}

FetchedContent.propTypes = {
  children: PropTypes.node.isRequired,
  processing: PropTypes.bool.isRequired,
  spinner: PropTypes.element,
  tableRow: PropTypes.bool, // spinner will be rendered inside `tr > td`
};

export default FetchedContent;
