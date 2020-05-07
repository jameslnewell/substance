import * as React from 'react';
import styled from 'styled-components';
import {combine} from './combine';
import {match} from './match';

export default {title: 'style/combine()'};

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
export const Responsive = () => {
  const Component = styled.div(
    {},
    combine([
      match('sm')({
        ':after': {
          content: '"📱"',
        },
      }),
      match('md')({
        ':after': {
          content: '"💻"',
        },
      }),
      match('lg')({
        ':after': {
          content: '"🖥"',
        },
      }),
    ]),
  );
  return <Component />;
};
