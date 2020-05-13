import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {ColumnLayout} from './columns';

export default {
  title: 'layout/ColumnLayout',
  component: ColumnLayout,
};

interface PlaceholderProps {
  height?: number;
}

const Placeholder: React.FC<PlaceholderProps> = ({children, ...otherProps}) => (
  <Box padding={2} backgroundColor="lightgrey" {...otherProps}>
    {children}
  </Box>
);

const CustomColumns = styled(ColumnLayout)({
  backgroundColor: 'purple',
});

const CustomColumn = styled(ColumnLayout.Column)({
  backgroundColor: 'orange',
});

export const WithWidth: React.FC = () => (
  <ColumnLayout>
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnLayout.Column>
  </ColumnLayout>
);

export const WithResponsiveWidth: React.FC = () => (
  <ColumnLayout space={4}>
    <ColumnLayout.Column width={{mobile: 1, tablet: 1 / 2, desktop: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={{mobile: 1, tablet: 1 / 2, desktop: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={{mobile: 1, tablet: 1 / 2, desktop: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={{mobile: 1, tablet: 1 / 2, desktop: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnLayout.Column>
  </ColumnLayout>
);

export const WithHAlign: React.FC = () => (
  <>
    <ColumnLayout halign="left">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>left</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
    <br />
    <ColumnLayout halign="center">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>center</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
    <br />
    <ColumnLayout halign="right">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>right</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
  </>
);

export const WithVAlign: React.FC = () => (
  <>
    <ColumnLayout valign="stretch">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>stretch</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
    <br />
    <ColumnLayout valign="top">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>top</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
    <br />
    <ColumnLayout valign="center">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>center</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
    <br />
    <ColumnLayout valign="bottom">
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnLayout.Column>
      <ColumnLayout.Column width={1 / 4}>
        <Placeholder>bottom</Placeholder>
      </ColumnLayout.Column>
    </ColumnLayout>
  </>
);

export const WithSpace: React.FC = () => (
  <ColumnLayout space={3}>
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnLayout.Column>
  </ColumnLayout>
);

export const WithSpaceWrappedColumnAndHAlign: React.FC = () => (
  <ColumnLayout space={3} halign="center">
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnLayout.Column>
  </ColumnLayout>
);

export const WithClassName: React.FC = () => (
  <CustomColumns space={3}>
    <CustomColumn width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </CustomColumn>
    <CustomColumn width="content">
      <Placeholder>content</Placeholder>
    </CustomColumn>
    <CustomColumn>
      <Placeholder>rest</Placeholder>
    </CustomColumn>
    <CustomColumn width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </CustomColumn>
  </CustomColumns>
);
