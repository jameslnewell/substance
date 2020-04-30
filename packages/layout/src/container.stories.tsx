import React from 'react';
import {Box} from '@substance/box';
import {Container} from './container';

export default {
  title: 'layout/Container',
  component: Container,
};

export const Default: React.FC = () => (
  <Box backgroundColor="deeppink">
    <Container>
      <Box backgroundColor="skyblue">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Box>
    </Container>
  </Box>
);
