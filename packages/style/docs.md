## How to...

### Negative spacing values

Add negative values to the spacing variations

### Custom values

Just add it in CSS as you would add any other value

#### Mixins

A collection of mixins for styling specific CSS properties.

```jsx
import styled from 'styled-components';
import {backgroundColor, color, paddingX} from '@substance/mixin';

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
