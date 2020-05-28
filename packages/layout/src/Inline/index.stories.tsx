import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {InlineLayout} from '.';

export default {
  title: 'layout/InlineLayout',
  component: InlineLayout,
};

const CustomInlineLayout = styled(InlineLayout)({
  backgroundColor: 'pink',
});

const Tag: React.FC = ({children}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    paddingX={2}
    paddingY={1}
    borderRadius={4}
    backgroundColor="skyblue"
    height={10 + Math.ceil((Math.random() * 100) / 10) * 10}
  >
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

export const WithAlignX: React.FC = () => (
  <>
    <Box backgroundColor="deeppink">
      <InlineLayout alignX="left">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignX="center">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignX="right">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignX={{xs: 'left', md: 'center', lg: 'right'}}>
        {tags}
      </InlineLayout>
    </Box>
  </>
);

export const WithAlignY: React.FC = () => (
  <>
    <Box backgroundColor="deeppink">
      <InlineLayout alignY="top">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignY="center">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignY="bottom">{tags}</InlineLayout>
    </Box>
    <br />
    <Box backgroundColor="deeppink">
      <InlineLayout alignY={{xs: 'left', md: 'center', lg: 'right'}}>
        {tags}
      </InlineLayout>
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
    <InlineLayout spaceX={3} spaceY={4}>
      {tags}
    </InlineLayout>
  </Box>
);

export const WithResponsiveSpace: React.FC = () => (
  <Box backgroundColor="deeppink">
    <InlineLayout spaceX={{sm: 2, md: 4}} spaceY={{sm: 2, md: 4}}>
      {tags}
    </InlineLayout>
  </Box>
);

export const WithClassName: React.FC = () => (
  <CustomInlineLayout>{tags}</CustomInlineLayout>
);
