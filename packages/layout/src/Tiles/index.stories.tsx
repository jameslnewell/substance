import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {TileLayout} from '.';

export default {
  title: 'layout/TileLayout',
  component: TileLayout,
};

const CustomTiles = styled(TileLayout)({
  backgroundColor: 'red',
});

const Tile: React.FC = () => (
  <Box backgroundColor="grey" padding={2}>
    Tile
  </Box>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTiles = (count: number): React.ReactElement<any>[] =>
  Array.from(new Array(count).keys()).map((_, index) => (
    <Tile key={index}>Tile</Tile>
  ));

export const Default: React.FC = () => (
  <TileLayout>{createTiles(4)}</TileLayout>
);

export const WithTwoColumns: React.FC = () => (
  <TileLayout columns={2}>{createTiles(3)}</TileLayout>
);

export const WithThreeColumns: React.FC = () => (
  <TileLayout columns={3}>{createTiles(5)}</TileLayout>
);

export const WithResponsiveColumns: React.FC = () => (
  <TileLayout columns={{sm: 1, md: 3, lg: 4}}>{createTiles(5)}</TileLayout>
);

export const WithAlignX: React.FC = () => (
  <>
    <TileLayout columns={2} alignX="left">
      {createTiles(3)}
    </TileLayout>
    <br />
    <TileLayout columns={2} alignX="center">
      {createTiles(3)}
    </TileLayout>
    <br />
    <TileLayout columns={2} alignX="right">
      {createTiles(3)}
    </TileLayout>
  </>
);

export const WithAlignY: React.FC = () => (
  <>
    <TileLayout columns={2} alignY="top">
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Align
      </Box>
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Top
      </Box>
    </TileLayout>
    <br />
    <TileLayout columns={2} alignY="center">
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Align
      </Box>
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Center
      </Box>
    </TileLayout>
    <br />
    <TileLayout columns={2} alignY="bottom">
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Align
      </Box>
      <Box backgroundColor="grey" padding={2} minHeight={Math.random() * 100}>
        Bottom
      </Box>
    </TileLayout>
  </>
);

export const WithSpaceX: React.FC = () => (
  <TileLayout columns={2} spaceX={3}>
    {createTiles(3)}
  </TileLayout>
);

export const WithSpaceY: React.FC = () => (
  <TileLayout columns={2} spaceY={3}>
    {createTiles(3)}
  </TileLayout>
);

export const WithResponsiveSpaceX: React.FC = () => (
  <TileLayout columns={2} spaceX={{sm: 3, md: 4, lg: 5}}>
    {createTiles(5)}
  </TileLayout>
);

export const WithClassName: React.FC = () => (
  <CustomTiles columns={2}>{createTiles(3)}</CustomTiles>
);

export const WithDifferentWidthContent: React.FC = () => (
  <TileLayout columns={2} spaceX={3}>
    <Box backgroundColor="grey" padding={2}>
      <h1>Longer content than the other tile</h1>
    </Box>
    <Box backgroundColor="grey" padding={2}>
      <h1>Shorter content</h1>
    </Box>
  </TileLayout>
);
