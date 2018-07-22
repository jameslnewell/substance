import * as React from 'react';
import styled from 'styled-components';
import {color, bg} from '@substance/color';
import Container from '@substance/container';
import {px} from '@substance/spacing';
import {copy} from '@substance/typography';

const HeaderWrapper = styled.header`
  ${px({mobile: 2, desktop: 0})}
  font-weight: bold;
  ${copy()}
  line-height: 2.5em;
  border-bottom: 1px solid ${color('shades.dark')};
  ${bg('alert.warning')};
`;

export const Header = () => (
  <HeaderWrapper>
    <Container>
      @substance
    </Container>
  </HeaderWrapper>
);
