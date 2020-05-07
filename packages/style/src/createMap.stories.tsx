import * as React from 'react';
import styled from 'styled-components';
import {MatchFunction, MapFunction} from './types';
import {defaultMediaQueries, DefaultMedia} from './defaultMediaQueries';
import {createMatch} from './createMatch';
import {createMap} from './createMap';
import {square} from './story-styles';

export default {title: 'style/createMap()'};

const match: MatchFunction<DefaultMedia> = createMatch(defaultMediaQueries);
const map: MapFunction<DefaultMedia> = createMap(match);

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
