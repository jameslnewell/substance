import * as React from 'react';
import styled from 'styled-components';
import {match} from './match';
import {square} from './story-styles';

export default {title: 'style/match()'};

const Square = styled.div(
  square,
  match('sm')({
    backgroundColor: 'red',
  }),
  match('md')({
    backgroundColor: 'green',
  }),
  match('lg')({
    backgroundColor: 'blue',
  }),
);

export const Default = () => <Square />;
