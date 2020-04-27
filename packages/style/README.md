# @substance/style

Utilities for styling.

## Installation

NPM:

```
npm install @substance/style
```

Yarn

```
yarn add @substance/style
```

### Usage

```jsx
import styled from 'styled-components';
import {breakpoint} from '@substance/style';

export const Sidebar = styled.div(
  {
    width: 100,
  },
  breakpoint('tablet')({
    width: 200,
  }),
  breakpoint('desktop')({
    width: 300,
  }),
);
```

#### Mixins

A collection of mixins for styling specific CSS properties.

```jsx
import styled from 'styled-components';
import {backgroundColor, color, paddingX} from '@substance/style/mixins';

export const Button = styled.button(
  {
    border: 'none'
  },
  color('surface'),
  backgroundColor('primary.dark'),
  paddingX('md'),
  props => ':hover': {
    ...color('surface')(props),
    ...backgroundColor('primary.dark')(props)
  },
);
```

#### Props

A collection of props for styling a collection of CSS properties.

```jsx
import styled from 'styled-components';
import {color, margin} from '@substance/style/props';

export const Text = styled.button(
  {
    margin: 0,
  },
  color,
  margin,
);

<Text color="surface" marginTop="sm">
  Hello World!
</Text>;
```
