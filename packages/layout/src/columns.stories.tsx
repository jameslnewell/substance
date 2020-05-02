import React from 'react';
import {Box} from '@substance/box';
import {ColumnsLayout} from './columns';

export default {
  title: 'layout/ColumnsLayout',
  component: ColumnsLayout,
};

interface PlaceholderProps {
  height?: number;
}

const Placeholder: React.FC<PlaceholderProps> = ({children, ...otherProps}) => (
  <Box padding={2} backgroundColor="lightgrey" {...otherProps}>
    {children}
  </Box>
);

export const WithWidth: React.FC = () => (
  <ColumnsLayout>
    <ColumnsLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnsLayout.Column>
  </ColumnsLayout>
);

export const WithResponsiveWidth: React.FC = () => (
  <ColumnsLayout space={4}>
    <ColumnsLayout.Column width={{sm: 1, md: 1 / 2, lg: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={{sm: 1, md: 1 / 2, lg: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={{sm: 1, md: 1 / 2, lg: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={{sm: 1, md: 1 / 2, lg: 1 / 4}}>
      <Placeholder>Feature</Placeholder>
    </ColumnsLayout.Column>
  </ColumnsLayout>
);

export const WithHAlign: React.FC = () => (
  <>
    <ColumnsLayout halign="left">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>left</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
    <br />
    <ColumnsLayout halign="center">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>center</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
    <br />
    <ColumnsLayout halign="right">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>right</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
  </>
);

export const WithVAlign: React.FC = () => (
  <>
    <ColumnsLayout valign="stretch">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>stretch</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
    <br />
    <ColumnsLayout valign="top">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>top</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
    <br />
    <ColumnsLayout valign="center">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>center</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
    <br />
    <ColumnsLayout valign="bottom">
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder height={64}>align</Placeholder>
      </ColumnsLayout.Column>
      <ColumnsLayout.Column width={1 / 4}>
        <Placeholder>bottom</Placeholder>
      </ColumnsLayout.Column>
    </ColumnsLayout>
  </>
);

export const WithSpace: React.FC = () => (
  <ColumnsLayout space={3}>
    <ColumnsLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnsLayout.Column>
  </ColumnsLayout>
);

export const WithSpaceWrappedColumnAndHAlign: React.FC = () => (
  <ColumnsLayout space={3} halign="center">
    <ColumnsLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width="content">
      <Placeholder>content</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnsLayout.Column>
    <ColumnsLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnsLayout.Column>
  </ColumnsLayout>
);
