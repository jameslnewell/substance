import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {TileLayout} from './tiles';

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

export const WithAlign: React.FC = () => (
  <>
    <TileLayout columns={2} align="left">
      {createTiles(3)}
    </TileLayout>
    <br />
    <TileLayout columns={2} align="center">
      {createTiles(3)}
    </TileLayout>
    <br />
    <TileLayout columns={2} align="right">
      {createTiles(3)}
    </TileLayout>
  </>
);

export const WithSpace: React.FC = () => (
  <TileLayout columns={2} space={3}>
    {createTiles(3)}
  </TileLayout>
);

export const WithResponsiveSpace: React.FC = () => (
  <TileLayout columns={2} space={{sm: 3, md: 4, lg: 5}}>
    {createTiles(5)}
  </TileLayout>
);

export const WithClassName: React.FC = () => (
  <CustomTiles columns={2} space={3}>
    {createTiles(3)}
  </CustomTiles>
);
