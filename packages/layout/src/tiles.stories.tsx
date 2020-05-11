import React from 'react';
import {Box} from '@substance/box';
import styled from 'styled-components';
import {TilesLayout} from './tiles';

export default {
  title: 'layout/TilesLayout',
  component: TilesLayout,
};

const CustomTiles = styled(TilesLayout)({
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
  <TilesLayout>{createTiles(4)}</TilesLayout>
);

export const WithTwoColumns: React.FC = () => (
  <TilesLayout columns={2}>{createTiles(3)}</TilesLayout>
);

export const WithThreeColumns: React.FC = () => (
  <TilesLayout columns={3}>{createTiles(5)}</TilesLayout>
);

export const WithResponsiveColumns: React.FC = () => (
  <TilesLayout columns={{sm: 1, md: 3, lg: 4}}>{createTiles(5)}</TilesLayout>
);

export const WithAlign: React.FC = () => (
  <>
    <TilesLayout columns={2} align="left">
      {createTiles(3)}
    </TilesLayout>
    <br />
    <TilesLayout columns={2} align="center">
      {createTiles(3)}
    </TilesLayout>
    <br />
    <TilesLayout columns={2} align="right">
      {createTiles(3)}
    </TilesLayout>
  </>
);

export const WithSpace: React.FC = () => (
  <TilesLayout columns={2} space={3}>
    {createTiles(3)}
  </TilesLayout>
);

export const WithResponsiveSpace: React.FC = () => (
  <TilesLayout columns={2} space={{sm: 3, md: 4, lg: 5}}>
    {createTiles(5)}
  </TilesLayout>
);

export const WithClassName: React.FC = () => (
  <CustomTiles columns={2} space={3}>
    {createTiles(3)}
  </CustomTiles>
);