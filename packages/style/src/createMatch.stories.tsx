import * as React from 'react';
import styled from 'styled-components';
import {defaultMedia} from './defaultMedia';
import {createMatch} from './createMatch';
import {square} from './story-styles';

export default {title: 'createMatch()'};

const media = createMatch({media: defaultMedia});

const Square = styled.div(
  square,
  media('mobile')({
    backgroundColor: 'red',
  }),
  media('tablet')({
    backgroundColor: 'green',
  }),
  media('desktop')({
    backgroundColor: 'blue',
  }),
);

export const Default = () => <Square />;
