import * as React from 'react';
import styled from 'styled-components';
import {createVariant} from './createVariant';
import {createProps} from './createProps';

export default {title: 'style/createVariant()'};

export const Button: React.FC = () => {
  const Button = styled.button(
    {
      cursor: 'pointer',
      margin: 0,
      padding: '0.75em 2em',
      borderWidth: 1,
      borderRadius: 4,
      borderStyle: 'solid',
      ':hover': {
        color: 'white',
        borderColor: '#222',
        backgroundColor: '#222',
      },
    },
    createProps({
      variant: createVariant({
        primary: {
          color: 'white',
          borderColor: 'blue',
          backgroundColor: 'blue',
        },
        secondary: {
          color: 'blue',
          borderColor: 'blue',
          backgroundColor: 'white',
        },
        tertiary: {
          color: 'blue',
          borderColor: 'transparent',
        },
      }),
      size: createVariant({
        small: {
          fontSize: '12px',
          padding: '0.75em 2em',
        },
        large: {
          fontSize: '16px',
          padding: '1em 3em',
        },
      }),
    }),
  );

  const Cell = styled.td({
    padding: 10,
    textAlign: 'center',
  });

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
            <Button variant="primary" size="small">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button variant="secondary" size="small">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button variant="tertiary" size="small">
              Click me!
            </Button>
          </Cell>
        </tr>
        <tr>
          <Cell as="th">Large</Cell>
          <Cell>
            <Button variant="primary" size="large">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button variant="secondary" size="large">
              Click me!
            </Button>
          </Cell>
          <Cell>
            <Button variant="tertiary" size="large">
              Click me!
            </Button>
          </Cell>
        </tr>
      </tbody>
    </table>
  );
};

export const UsingStyleObjects: React.FC = () => {
  const circle = {
    display: 'inline-block',
    width: 100,
    height: 100,
    borderRadius: '100%',
  };

  const color = createVariant({
    gold: {
      backgroundColor: 'gold',
    },
    silver: {
      backgroundColor: 'silver',
    },
    bronze: {
      backgroundColor: 'peru',
    },
  });

  const GoldMedal = styled.div(circle, color('gold'));

  const SilverMedal = styled.div(circle, color('silver'));

  const BronzeMedal = styled.div(circle, color('bronze'));

  return (
    <>
      <GoldMedal />
      <SilverMedal />
      <BronzeMedal />
    </>
  );
};

export const UsingStyleFunctions = () => {
  const circle = {
    display: 'block',
    width: 100,
    height: 100,
    borderRadius: '100%',
  };

  const Light = styled.div(
    circle,
    createProps({
      type: createVariant({
        slow: () => ({
          backgroundColor: 'orange',
        }),
        stop: () => ({
          backgroundColor: 'red',
        }),
        go: () => ({
          backgroundColor: 'green',
        }),
      }),
    }),
  );

  return (
    <>
      <Light type="go" />
      <Light type="slow" />
      <Light type="stop" />
    </>
  );
};

export const UsingStyleArrays = () => {
  const circle = {
    display: 'block',
    width: 100,
    height: 100,
    borderRadius: '100%',
  };

  const Light = styled.div(
    circle,
    {
      ':before': {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    createProps({
      type: createVariant({
        slow: [
          {
            ':before': {
              content: '"Slow!"',
            },
          },
          () => ({
            backgroundColor: 'orange',
          }),
        ],
        stop: [
          {
            ':before': {
              content: '"Stop!"',
            },
          },
          () => ({
            backgroundColor: 'red',
          }),
        ],
        go: [
          {
            ':before': {
              content: '"Go!"',
            },
          },
          () => ({
            backgroundColor: 'green',
          }),
        ],
      }),
    }),
  );

  return (
    <>
      <Light type="go" />
      <Light type="slow" />
      <Light type="stop" />
    </>
  );
};
