import * as React from 'react';
import styled from 'styled-components';
import {createVariant} from './createVariant';
import {createProps} from './createProps';

export default {title: 'style/createVariant()'};

const props = createProps({
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
});

export const Button: React.FC = () => {
  const Button = styled.button`
    cursor: pointer;
    margin: 0;
    padding: 0.75em 2em;
    border-width: 2px;
    border-radius: 4px;
    border-style: solid;
    :hover {
      color: white;
      border-color: #222;
      background-color: #222;
    }
    ${props}
  `;

  const Cell = styled.td`
    padding: 1em;
    text-align: center;
  `;

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

  const props = createProps({
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
  });
  const Light = styled.div(circle, props);

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
