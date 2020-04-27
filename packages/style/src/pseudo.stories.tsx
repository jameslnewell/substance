import * as React from 'react';
import styled from 'styled-components';
import {createMatch} from './createMatch';
import {defaultMedia} from './defaultMedia';
import {pseudo} from './pseudo';

export default {title: 'pseudo()'};

const match = createMatch({media: defaultMedia});

const Device = styled.div(
  {},
  pseudo(
    ':after',
    {
      padding: `1em`,
    },
    match('mobile')({
      content: '"📱"',
    }),
    match('tablet')({
      content: '"💻"',
    }),
    match('desktop')({
      content: '"🖥"',
    }),
  ),
);

export const Default: React.FC = () => <Device>Device: </Device>;
