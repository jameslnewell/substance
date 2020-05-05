import * as React from 'react';
import styled from 'styled-components';
import {backgroundColor, paddingY} from '@substance/mixin';
import {ContainerLayout} from '@substance/layout';

// ${copy()}
const Outer = styled.footer`
  ${backgroundColor('shades.dark')};
`;

const Inner = styled.footer`
  ${paddingY(2)}
  ${backgroundColor('shades.dark')};
`;

export const Footer = () => (
  <Outer>
    <ContainerLayout>
      <Inner>Copyright &copy; {new Date().getFullYear()}.</Inner>
    </ContainerLayout>
  </Outer>
);
