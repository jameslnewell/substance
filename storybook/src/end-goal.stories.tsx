/**
 * This file is a representation of the end-state that I want to get to for styles
 * TODO: rewrite to use tagged template literals
 */

import React from 'react';
import styled from 'styled-components';
import {createVariant, createProps, pseudo} from '@substance/style';
import {
  paddingX,
  paddingY,
  color,
  backgroundColor,
  borderColor,
} from '@substance/mixin';

export default {
  title: 'End Goal',
};

const common = () => [
  {
    cursor: 'pointer',
    margin: 0,
    padding: '0.75em 2em',
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    ':disabled': {
      cursor: 'default',
    },
  },
  pseudo(':hover', [
    color('surface'),
    borderColor('onSurface'),
    backgroundColor('onSurface'),
  ]),
];

const filled = () => [
  color('onSurface'),
  backgroundColor('primary'),
  borderColor('primary'),
  pseudo(':disabled', [{color: 'green'}]),
];

const bordered = () => [
  color('primary'),
  backgroundColor('transparent'),
  borderColor('primary'),
];

const borderless = () => [
  color('primary'),
  backgroundColor('transparent'),
  borderColor('transparent'),
];

const variant = createVariant({
  primary: [filled()],
  secondary: [bordered()],
  tertiary: [borderless()],
});

const size = createVariant({
  small: [
    {
      fontSize: '12px',
    },
    paddingX(3),
    paddingY(1),
    {
      ':disabled': {
        backgroundColor: 'red',
      },
    },
  ],
  large: [
    {
      fontSize: '16px',
    },
    paddingX(5),
    paddingY(3),
  ],
});

const Button = styled.button(
  {},
  common(),
  createProps({
    variant,
    size,
  }),
);

const Cell = styled.td({
  padding: 10,
  textAlign: 'center',
});

const DemoTable: React.FC<{disabled?: boolean}> = ({...otherProps}) => {
  return (
    <table>
      <thead>
        <tr>
          <Cell as="th"></Cell>
          <Cell as="th">Primary</Cell>
          <Cell as="th">Secondary</Cell>
          <Cell as="th">Tertiary</Cell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Cell as="th">Small</Cell>
          <Cell>
            <Button {...otherProps} variant="primary" size="small">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button {...otherProps} variant="secondary" size="small">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button {...otherProps} variant="tertiary" size="small">
              Click me!
            </Button>
          </Cell>
        </tr>
        <tr>
          <Cell as="th">Large</Cell>
          <Cell>
            <Button {...otherProps} variant="primary" size="large">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button {...otherProps} variant="secondary" size="large">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button {...otherProps} variant="tertiary" size="large">
              Click me!
            </Button>
          </Cell>
        </tr>
      </tbody>
    </table>
  );
};

export const Default: React.FC = () => <DemoTable />;
export const Disabled: React.FC = () => <DemoTable disabled={true} />;
