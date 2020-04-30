import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Box} from '@substance/box';
import {theme} from '../../style/src/story-theme';
import {InlineLayout} from './inline';

export default {
  title: 'layout/InlineLayout',
  component: InlineLayout,
};

const Tag: React.FC = ({children}) => (
  <Box paddingX={2} paddingY={1} borderRadius={4} backgroundColor="skyblue">
    {children}
  </Box>
);

const tags = (
  <>
    <Tag>react</Tag>
    <Tag>styled-components</Tag>
    <Tag>design system</Tag>
    <Tag>media queries</Tag>
    <Tag>components</Tag>
    <Tag>props</Tag>
  </>
);

export const AlignLeft: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout align="left">{tags}</InlineLayout>
  </Box>
);

export const AlignCenter: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout align="center">{tags}</InlineLayout>
  </Box>
);

export const AlignRight: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout align="right">{tags}</InlineLayout>
  </Box>
);

export const WithoutSpacing: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout>{tags}</InlineLayout>
  </Box>
);

export const WithSpacing: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout space={2}>{tags}</InlineLayout>
  </Box>
);

export const WithResponsiveSpacing: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Box backgroundColor="deeppink">
      <InlineLayout space={{sm: 2, md: 4}}>{tags}</InlineLayout>
    </Box>
  </ThemeProvider>
);
