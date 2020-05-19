import * as React from 'react';
import styled from 'styled-components';
import {GitHub} from 'react-feather';
import {color, backgroundColor, paddingY} from '@substance/mixin';
import {ContainerLayout, ColumnLayout} from '@substance/layout';
import {Logo} from '../Logo';

// ${/*copy()*/}
const Outer = styled.header`
  border-bottom: 1px solid ${color('shades.dark')};
  ${backgroundColor('onSurface')};
`;

const Text = styled.div`
  display: inline-flex;
  margin: 0;
  ${color('surface')};
  font-weight: bold;
  line-height: 2.5em;
`;

const Inner = styled.div`
  ${paddingY(2)}
`;

export const Header = () => (
  <Outer>
    <ContainerLayout>
      <Inner>
        <ColumnLayout valign="center">
          <ColumnLayout.Column>
            <Text as="div">
              <Logo />
            </Text>
          </ColumnLayout.Column>
          <ColumnLayout.Column width="content">
            <Text
              href="https://github.com/jameslnewell/substance"
              rel="noopener noreferrer"
              target="_blank"
              as="a"
            >
              <GitHub />
            </Text>
          </ColumnLayout.Column>
        </ColumnLayout>
      </Inner>
    </ContainerLayout>
  </Outer>
);
