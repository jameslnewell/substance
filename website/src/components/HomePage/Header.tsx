import * as React from 'react';
import styled from 'styled-components';
import {color, bg} from '@substance/color';
import Container from '@substance/container';
import {px} from '@substance/spacing';
import {font} from '@substance/typography';

const HeaderWrapper = styled.header`
  ${px({mobile: 2, desktop: 0})}
  font-weight: bold;
  ${font()}
  line-height: 2.5em;
  border-bottom: 1px solid ${color('dark')};
  ${bg('warning')};
`;

export const Header = () => (
  <HeaderWrapper>
    <Container>
      @substance
    </Container>
  </HeaderWrapper>
);
