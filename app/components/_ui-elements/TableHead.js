/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TableHeadCore from '@material-ui/core/TableHead';

import styled from 'styled-components';

const TableHead = styled(({ ...props }) => <TableHeadCore {...props} />)``;

export { TableHead };
