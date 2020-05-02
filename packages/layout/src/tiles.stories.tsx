import React from 'react';

import {Placeholder} from '../../Placeholder';
import {TilesLayout} from './tiles';

export default {
  title: 'layout/TilesLayout',
  component: TilesLayout,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTiles = (count: number): React.ReactElement<any>[] =>
  [...new Array(count).keys()].map((_, index) => (
    <Placeholder key={index}>Tile</Placeholder>
  ));

export const Default: React.FC = () => <Tiles>{createTiles(4)}</Tiles>;

export const WithTwoColumns: React.FC = () => (
  <Tiles columns={2}>{createTiles(3)}</Tiles>
);

export const WithThreeColumns: React.FC = () => (
  <Tiles columns={3}>{createTiles(5)}</Tiles>
);

export const WithResponsiveColumns: React.FC = () => (
  <Tiles columns={[1, 3, 4]}>{createTiles(5)}</Tiles>
);

export const WithSpace: React.FC = () => (
  <Tiles columns={2} space={3}>
    {createTiles(3)}
  </Tiles>
);

export const WithResponsiveSpace: React.FC = () => (
  <Tiles columns={2} space={[3, 4, 7]}>
    {createTiles(5)}
  </Tiles>
);

export const LeftAligned: React.FC = () => (
  <Tiles columns={2} align="left">
    {createTiles(3)}
  </Tiles>
);

export const CenterAligned: React.FC = () => (
  <Tiles columns={2} align="center">
    {createTiles(3)}
  </Tiles>
);

export const RightAligned: React.FC = () => (
  <Tiles columns={2} align="right">
    {createTiles(3)}
  </Tiles>
);
