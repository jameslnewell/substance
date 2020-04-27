# @substance/style 🧬

Primitives for styling.

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
import {match} from '@substance/style';

export const Sidebar = styled.div(
  {
    width: 100,
  },
  match('tablet')({
    width: 200,
  }),
  match('desktop')({
    width: 300,
  }),
);
```
