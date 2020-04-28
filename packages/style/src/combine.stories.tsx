import * as React from 'react';
import styled from 'styled-components';
import {combine} from './combine';
import {createMixin} from './createMixin';
import {createMap} from './createMap';
import {createMatch} from './createMatch';
import {defaultMedia} from './defaultMedia';

export default {title: 'combine()'};

const fontSize = createMixin({
  map: createMap({match: createMatch({media: defaultMedia})}),
  properties: ['fontSize'],
  transform: (value: string) => value,
});

const lineHeight = createMixin({
  map: createMap({match: createMatch({media: defaultMedia})}),
  properties: ['lineHeight'],
  transform: (value: string) => value,
});

const Square = styled.div(
  {},
  combine(
    // {color: 'white'},
    // {backgroundColor: 'red'},
    // ({size}: {size: number}) => ({
    //   width: size,
    //   height: size,
    // }),
    fontSize({mobile: '22px'}),
    lineHeight({mobile: '16px'}),
  ),
);

export const Default = () => <Square>Hello World!</Square>;
