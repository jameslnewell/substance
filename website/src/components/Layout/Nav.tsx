import * as React from 'react';
import styled from 'styled-components';
import {backgroundColor} from '@substance/style/mixins';

const Wrapper = styled.nav`
  ${backgroundColor('shades.light')}
  width: 300px;
`;

export class Nav extends React.Component {
  render() {
    return <Wrapper>Nav</Wrapper>;
  }
}
