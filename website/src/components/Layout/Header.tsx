import * as React from 'react';
import styled from 'styled-components';
import {color, backgroundColor, paddingY} from '@substance/mixin';
import {ContainerLayout} from '@substance/layout';

// ${/*copy()*/}
const Outer = styled.header`
  font-weight: bold;
  line-height: 2.5em;
  border-bottom: 1px solid ${color('shades.dark')};
  ${backgroundColor('alert.warning')};
`;

const Inner = styled.div`
  ${paddingY(2)}
`;

export const Header = () => (
  <Outer>
    <ContainerLayout>
      <Inner>@substance</Inner>
    </ContainerLayout>
  </Outer>
);
