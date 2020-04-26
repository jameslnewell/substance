# @substance/breakpoints

Utility functions for creating breakpoints with `styled-components` 💅

## Installation

NPM:
```bash
npm install --save @substance/breakpoints 
```

Yarn:
```yarn
yarn add @substance/breakpoints
```

## Usage

### Using themable mixins

```jsx
import styled from 'styled-components';
import breakpoint, {map} from 'styled-components-breakpoint';
 
const Heading = styled.h1`
  color: #444;
  font-family: sans-serif;
  font-size: 12px;
 
  ${breakpoint('md')`
    font-size: 16px;
  `}
 
  ${breakpoint('xl')`
    font-size: 24px;
  `}
 
  ${map({mobile: 'red', desktop: 'green'}, color => `color: ${color};`)}
 
`;
```
