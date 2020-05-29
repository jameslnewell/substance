import * as React from 'react';
import {InlineLayout} from '@substance/layout';

export const Logo = () => (
  <>
    <InlineLayout spaceX={1}>
      <span aria-hidden="true">⚗️</span>
      <span>Substance</span>
    </InlineLayout>
  </>
);
