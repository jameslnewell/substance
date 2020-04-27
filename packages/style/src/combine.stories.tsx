import * as React from 'react';
import styled from 'styled-components';
import {combine} from './combine';

export default {title: 'combine()'};

const Square = styled.div(
  {},
  combine(
    {color: 'white'},
    {backgroundColor: 'red'},
    ({size}: {size: number}) => ({
      width: size,
      height: size,
    }),
  ),
);

export const Default = () => <Square size={123} />;
