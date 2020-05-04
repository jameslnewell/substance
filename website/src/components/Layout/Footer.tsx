import * as React from 'react';
import styled from 'styled-components';
import {backgroundColor, paddingX} from '@substance/mixin';
import {Container} from '@substance/layout';

// ${copy()}
const FooterWrapper = styled.footer`
  ${paddingX({mobile: 2, desktop: 0})}
  ${backgroundColor('shades.dark')};
`;

export const Footer = () => (
  <FooterWrapper>
    <Container>Copyright &copy; {new Date().getFullYear()}.</Container>
  </FooterWrapper>
);
