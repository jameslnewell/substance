import * as React from 'react';
import styled from 'styled-components';
import {color, bg} from '@substance/color';
import Container from '@substance/container';
import {px} from '@substance/spacing';
import {copy} from '@substance/typography';

const FooterWrapper = styled.footer`
  ${px({mobile: 2, desktop: 0})}
  ${copy()}
  ${bg('shades.dark')};
`;

export const Footer = () => (
  <FooterWrapper>
    <Container>
      Copyright &copy; 2018.
    </Container>
  </FooterWrapper>
);
