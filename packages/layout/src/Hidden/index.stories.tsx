import React from 'react';
import {Hidden} from './index';
import {
  withExampleThemeProvider,
  ExampleTheme,
} from '../../../../storybook/src/__fixtures__';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ExampleTheme {}
}

export default {
  title: 'layout/Hidden',
  component: Hidden,
};

export const Inline: React.FC = withExampleThemeProvider(() => (
  <>
    <p>
      I am never{' '}
      <Hidden hide={true} inline>
        visible
      </Hidden>
      .
    </p>
    <p>
      I am only ever visible on{' '}
      <Hidden hide={{sm: false, md: true}} inline>
        <em>mobile</em>{' '}
        <span role="img" aria-label="phone">
          📱
        </span>
      </Hidden>
      <Hidden hide={{sm: true, md: false, lg: true}} inline>
        <em>tablet</em>{' '}
        <span role="img" aria-label="tablet">
          💻
        </span>
      </Hidden>
      <Hidden hide={{sm: true, lg: false}} inline>
        <em>desktop</em>{' '}
        <span role="img" aria-label="desktop">
          🖥
        </span>
      </Hidden>
    </p>
  </>
));

export const Block: React.FC = withExampleThemeProvider(() => (
  <>
    <Hidden hide={true}>
      <p>I am never visible.</p>
    </Hidden>
    <Hidden hide={{sm: false, md: true}}>
      <p>
        I am only ever visible on <em>mobile</em>{' '}
        <span role="img" aria-label="phone">
          📱
        </span>
      </p>
    </Hidden>
    <Hidden hide={{sm: true, md: false, lg: true}}>
      <p>
        I am only ever visible on <em>tablet</em>{' '}
        <span role="img" aria-label="tablet">
          💻
        </span>
      </p>
    </Hidden>
    <Hidden hide={{sm: true, lg: false}}>
      <p>
        I am only ever visible on <em>desktop</em>{' '}
        <span role="img" aria-label="tablet">
          🖥
        </span>
      </p>
    </Hidden>
  </>
));
