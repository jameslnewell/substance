import React from 'react';
import {ThemeProvider} from 'styled-components';
import {addDecorator} from '@storybook/react';
import {theme} from './theme';

addDecorator((storyFn) => {
  // Because storyFn is a function and not a component, its immediate child won't
  // get wrapped by ThemeProvider. Wrapping it in an extra layer of components
  // means it will.
  const Component = () => storyFn();
  return React.createElement(ThemeProvider, {
    theme,
    children: React.createElement(Component),
  });
});
