import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {InlineLayout} from './inline';

export default {
  title: 'layout/InlineLayout',
  component: InlineLayout,
};

const CustomInlineLayout = styled(InlineLayout)({
  backgroundColor: 'pink',
});

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

export const WithHAlign: React.FC = () => (
  <>
    <Box backgroundColor="deeppink">
      <InlineLayout halign="left">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout halign="center">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout halign="right">{tags}</InlineLayout>
    </Box>
  </>
);

export const WithVAlign: React.FC = () => (
  <>
    <Box backgroundColor="deeppink">
      <InlineLayout valign="top">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout valign="center">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout valign="bottom">{tags}</InlineLayout>
    </Box>
  </>
);

export const WithoutSpace: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout>{tags}</InlineLayout>
  </Box>
);

export const WithSpace: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout space={2}>{tags}</InlineLayout>
  </Box>
);

export const WithResponsiveSpace: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout space={{sm: 2, md: 4}}>{tags}</InlineLayout>
  </Box>
);

export const WithClassName: React.FC = () => (
  <CustomInlineLayout>{tags}</CustomInlineLayout>
);
