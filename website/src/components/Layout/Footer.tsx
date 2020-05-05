import * as React from 'react';
import styled from 'styled-components';
import {backgroundColor, paddingX} from '@substance/mixin';
import {ContainerLayout} from '@substance/layout';

// ${copy()}
const FooterWrapper = styled.footer`
  ${paddingX({mobile: 2, desktop: 0})}
  ${backgroundColor('shades.dark')};
`;

export const Footer = () => (
  <FooterWrapper>
    <ContainerLayout>
      Copyright &copy; {new Date().getFullYear()}.
    </ContainerLayout>
  </FooterWrapper>
);
