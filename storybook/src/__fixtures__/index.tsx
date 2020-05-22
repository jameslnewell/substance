import React from 'react';
import {ThemeProvider} from 'styled-components';

export const exampleColors = ['red', 'green', 'blue'];

export const square = {
  width: 100,
  height: 100,
  backgroundColor: 'grey',
};

export type ExampleMedia = 'sm' | 'md' | 'lg';

export type ExampleMediaQueries = {
  [media in ExampleMedia]: string;
};

export interface ExampleTheme {
  media: ExampleMediaQueries;
}

export const exampleQueries = {
  sm: '(min-width:0)',
  md: '(min-width:30em)',
  lg: '(min-width:60em)',
};

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ExampleTheme {}
}

export const exampleTheme: ExampleTheme = {
  media: exampleQueries,
};

export const ExampleThemeWrapper: React.FC = ({children}) => (
  <ThemeProvider theme={exampleTheme}>{children}</ThemeProvider>
);

export function withExampleThemeProvider<P = {}>(
  Component: React.ComponentType<P>,
): React.FC<P> {
  const WithExampleThemeProvider: React.FC<P> = (props) => (
    <ThemeProvider theme={exampleTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
  return WithExampleThemeProvider;
}
