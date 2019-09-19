/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ContainerCore from '@material-ui/core/Container';

import styled from 'styled-components';

const Container = styled(({ ...props }) => <ContainerCore {...props} />)``;

export { Container };
