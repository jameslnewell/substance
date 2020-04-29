import * as React from 'react';
import styled from 'styled-components';
import {defaultMediaQueries} from './defaultMediaQueries';
import {createMatch} from './createMatch';
import {createMap} from './createMap';
import {square} from './story-styles';

export default {title: 'createMap()'};

const map = createMap({
  match: createMatch({mediaQueries: defaultMediaQueries}),
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
