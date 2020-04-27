import * as React from 'react';
import styled from 'styled-components';
import {defaultMedia} from './defaultMedia';
import {createMatch} from './createMatch';
import {createMap} from './createMap';
import {square} from './story-styles';

export default {title: 'createMap()'};

const map = createMap({
  match: createMatch({media: defaultMedia}),
});

const colors = {
  red: 'pink',
  green: 'lime',
  blue: 'skyblue',
};

const Square = styled.div(
  square,
  map(
    {
      mobile: 'red',
      tablet: 'green',
      desktop: 'blue',
    },
    (value) => ({backgroundColor: colors[value]}),
  ),
);

export const Default = () => <Square />;
