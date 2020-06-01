import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {withExampleThemeProvider} from '@substance/test-utilities';
import {ColumnLayout} from '.';

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

export const Default: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const WithOffset: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column offset={1 / 4} width={1 / 4}>
      Column
    </ColumnLayout.Column>
  </ColumnLayout>
));

export const WidthMin: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column width="min">Column</ColumnLayout.Column>
  </ColumnLayout>
));

export const WidthMax: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column width="max">Column</ColumnLayout.Column>
  </ColumnLayout>
));

export const WidthNumber: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column width={1 / 2}>Column</ColumnLayout.Column>
  </ColumnLayout>
));

export const WidthResponsive: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout>
    <ColumnLayout.Column width={{sm: 1, md: 'min', lg: 1 / 4}}>
      Column
    </ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignXLeft: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignX="left">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignXCenter: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignX="center">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignXRight: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignX="right">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignXResponsive: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignX={{sm: 'left', md: 'center', lg: 'right'}}>
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignYTop: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignY="top">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignYCenter: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignY="center">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignYBottom: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignY="bottom">
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const AlignYResponsive: React.FC = withExampleThemeProvider(() => (
  <ColumnLayout alignY={{sm: 'top', md: 'center', lg: 'bottom'}}>
    <ColumnLayout.Column width={1 / 4}>Coulumn</ColumnLayout.Column>
  </ColumnLayout>
));

export const WithSpaceX: React.FC = () => (
  <ColumnLayout spaceX={3}>
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="min">
      <Placeholder>min</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column>
      <Placeholder>rest</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </ColumnLayout.Column>
  </ColumnLayout>
);

export const WithSpaceY: React.FC = () => (
  <ColumnLayout spaceY={3}>
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="min">
      <Placeholder>min</Placeholder>
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
  <ColumnLayout spaceX={3} spaceY={3} alignX="center">
    <ColumnLayout.Column width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </ColumnLayout.Column>
    <ColumnLayout.Column width="min">
      <Placeholder>min</Placeholder>
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
  <CustomColumns spaceX={3} spaceY={3}>
    <CustomColumn width={1 / 2}>
      <Placeholder>1/2</Placeholder>
    </CustomColumn>
    <CustomColumn width="min">
      <Placeholder>min</Placeholder>
    </CustomColumn>
    <CustomColumn>
      <Placeholder>rest</Placeholder>
    </CustomColumn>
    <CustomColumn width={2 / 3}>
      <Placeholder>2/3</Placeholder>
    </CustomColumn>
  </CustomColumns>
);

export const RetainsWidthWhenIsWider: React.FC = () => (
  <CustomColumns>
    <CustomColumn width={1 / 2}>
      <pre>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu
        sapien, aliquam eget ligula eu, posuere vehicula elit. Morbi sed
        fringilla ipsum, a euismod metus. Sed ut egestas nibh, eget pellentesque
        tortor. Nullam ut dolor augue. Quisque venenatis sapien ac finibus
        consectetur. Praesent sit amet molestie est. Quisque sed faucibus purus,
        ut posuere nisi. Integer rhoncus purus quis aliquet vestibulum. Quisque
        pellentesque at ipsum quis faucibus.
      </pre>
    </CustomColumn>
  </CustomColumns>
);
