import * as React from 'react';
import styled from 'styled-components';
import {backgroundColor, paddingY} from '@substance/mixin';
import {ContainerLayout} from '@substance/layout';

const Outer = styled.nav`
  width: 300px;
  ${backgroundColor('shades.light')}
`;

const Inner = styled.div`
  ${paddingY(2)}
`;

export class Nav extends React.Component {
  render() {
    return (
      <Outer>
        <ContainerLayout>
          <Inner>Nav</Inner>
        </ContainerLayout>
      </Outer>
    );
  }
}
