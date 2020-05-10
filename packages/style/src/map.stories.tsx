import * as React from 'react';
import styled from 'styled-components';
import {map} from './map';
import {square} from './story-styles';

export default {title: 'style/map()'};

const Square = styled.div(
  square,
  map(
    {
      mobile: 'dark',
      desktop: 'light',
    },
    (value) => (props) => ({
      backgroundColor: props.theme?.color.green?.[value],
    }),
  ),
);

export const Default: React.FC = () => <Square />;
