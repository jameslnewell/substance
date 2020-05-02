import * as React from 'react';
import styled from 'styled-components';
import {color, backgroundColor} from '@substance/style/mixins';
import {Container} from '@substance/layout';
import {paddingX} from '@substance/style/mixins';

// ${/*copy()*/}
const HeaderWrapper = styled.header`
  ${paddingX({mobile: 2, desktop: 0})}
  font-weight: bold;
  line-height: 2.5em;
  border-bottom: 1px solid ${color('shades.dark')};
  ${backgroundColor('alert.warning')};
`;

export const Header = () => (
  <HeaderWrapper>
    <Container>@substance</Container>
  </HeaderWrapper>
);
