import * as React from 'react';
import styled from 'styled-components';
import {createMatch} from './createMatch';
import {defaultMediaQueries} from './defaultMediaQueries';
import {pseudo} from './pseudo';

export default {title: 'style/pseudo()'};

const match = createMatch({mediaQueries: defaultMediaQueries});

const Device = styled.div(
  {},
  pseudo(
    ':after',
    {
      padding: `1em`,
    },
    match('mobile')({
      ':after': {
        content: '"📱"',
      },
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
