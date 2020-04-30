import * as React from 'react';
import styled from 'styled-components';
import {defaultMediaQueries} from './defaultMediaQueries';
import {createMatch} from './createMatch';
import {square} from './story-styles';

export default {title: 'style/createMatch()'};

const match = createMatch({mediaQueries: defaultMediaQueries});

const Square = styled.div(
  square,
  match('mobile')({
    backgroundColor: 'red',
  }),
  match('tablet')({
    backgroundColor: 'green',
  }),
  match('desktop')({
    backgroundColor: 'blue',
  }),
);

export const Default = () => <Square />;
