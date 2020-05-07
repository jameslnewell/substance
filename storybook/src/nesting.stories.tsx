/**
 * This file is a representation of the end-state that I want to get to for styles
 * TODO: rewrite to use tagged template literals
 */

import React from 'react';
import styled from 'styled-components';

export default {
  title: 'Nesting Experiments',
};

const circle = {
  display: 'block',
  width: 100,
  height: 100,
  backgroundColor: 'lightgrey',
};

export const FunctionReturningAMediaObject = () => {
  const Component = styled.div(circle, () => ({
    '@media screen': {
      backgroundColor: 'red',
      ':hover': {
        backgroundColor: 'green',
      },
      ':active': {
        backgroundColor: 'blue',
      },
    },
  }));
  return <Component />;
};

export const FunctionReturningAMediaObjectWithAKeyFunction = () => {
  const Component = styled.div(circle, () => ({
    backgroundColor: 'red',
  }));
  return <Component />;
};

export const FunctionReturningAnArray = () => {
  const Component = styled.div(circle, () => [
    {
      backgroundColor: 'red',
    },
    () => ({
      border: '4px solid green',
    }),
  ]);
  return <Component />;
};

export const FunctionReturningAFunctionReturningAnObject = () => {
  const Component = styled.div(circle, () => () => ({
    backgroundColor: 'red',
  }));
  return <Component />;
};
export const FunctionReturningAFunctionReturningAnArray = () => {
  const Component = styled.div(circle, () => () => [
    {
      backgroundColor: 'red',
    },
    () => ({
      border: '4px solid green',
    }),
  ]);
  return <Component />;
};
