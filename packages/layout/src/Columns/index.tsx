import React from 'react';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  createProps,
} from '@substance/style';
import {
  getSpace,
  SpaceConstraint,
  GetSpaceFunction,
  ThemedGetSpaceFunction,
  SpaceMixinFunction,
  paddingTop,
  paddingLeft,
  justifyContent,
  alignItems,
  MixinFunction,
  MixinFunctionValue,
} from '@substance/mixin';
import styled, {css} from 'styled-components';
import {createSpaceStyles} from '../styles';
import {
  ResponsiveAlignX,
  ResponsiveAlignY,
  mapAlignX,
  mapAlignY,
} from '../utils/alignment';

export type ColumnsLayoutColumnWidth = number | 'min' | 'max';

export interface ColumnsLayoutColumnProps<Media extends MediaConstraint> {
  offset?: ResponsiveValue<Media, number>;
  width?: ResponsiveValue<Media, ColumnsLayoutColumnWidth>;
  className?: string;
}

export interface ColumnsLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  alignX?: ResponsiveAlignX<Media>;
  alignY?: ResponsiveAlignY<Media>;
  spaceX?: ResponsiveValue<Media, Space>;
  spaceY?: ResponsiveValue<Media, Space>;
  className?: string;
}

interface WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $spaceY?: ColumnsLayoutProps<Media, Space>['spaceY'];
}

interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $alignItems?: MixinFunctionValue<Media, 'align-items'>;
  $justifyContent?: MixinFunctionValue<Media, 'justify-content'>;
  $spaceX?: ColumnsLayoutProps<Media, Space>['spaceX'];
}

interface ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $spaceX?: ColumnsLayoutProps<Media, Space>['spaceX'];
  $spaceY?: ColumnsLayoutProps<Media, Space>['spaceY'];
  $offset?: ColumnsLayoutColumnProps<Media>['offset'];
  $width?: ColumnsLayoutColumnProps<Media>['width'];
}

export interface CreateColumnLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  alignItems: MixinFunction<Media, 'align-items'>;
  justifyContent: MixinFunction<Media, 'justify-content'>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export type ColumnLayout<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = React.FC<ColumnsLayoutProps<Media, Space>> & {
  Column: React.ComponentType<ColumnsLayoutColumnProps<Media>>;
};

export const createColumnLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
}: CreateColumnLayoutOptions<Media, Space>): ColumnLayout<Media, Space> => {
  const SpaceXContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);
  const SpaceYContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);

  const styles = createSpaceStyles<Media, Space>({
    map,
    getSpace,
    paddingTop,
    paddingLeft,
  });

  const Wrapper = styled.div<WrapperProps<Media, Space>>`
    ${styles.wrapper}
  `;

  const Container = styled.div<ContainerProps<Media, Space>>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${styles.container}
    ${createProps({
      $alignItems: alignItems,
      $justifyContent: justifyContent,
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    ${styles.item}
    ${createProps({
      $offset: (offset: ResponsiveValue<Media, number>) => {
        return map(offset, (o) => {
          const pct = Math.round(o * 100 * 10000) / 10000;
          return css`
            margin-left: ${pct}%;
          `;
        });
      },
      $width: (width: ResponsiveValue<Media, ColumnsLayoutColumnWidth>) => {
        return map(width, (w) => {
          switch (w) {
            case 'min': {
              return css`
                flex-grow: 0;
                flex-basis: auto;
                /* width: auto; */
                max-width: none;
              `;
            }
            case 'max': {
              return css`
                flex-grow: 1;
                flex-basis: auto;
                /* width: auto; */
                max-width: 100%;
              `;
            }
            default: {
              const pct =
                Math.round((typeof w === 'number' ? w : 1) * 100 * 10000) /
                10000;
              return css`
                flex-grow: initial;
                flex-basis: ${pct}%;
                max-width: ${pct}%;
              `;
            }
          }
        });
      },
    })}
  `;

  const ColumnsLayoutColumn: React.FC<ColumnsLayoutColumnProps<Media>> = ({
    children,
    offset,
    width = 1,
    ...otherProps
  }) => (
    <SpaceXContext.Consumer>
      {(spaceX): React.ReactElement => (
        <SpaceYContext.Consumer>
          {(spaceY): React.ReactElement => (
            <Item
              {...otherProps}
              $spaceX={spaceX}
              $spaceY={spaceY}
              $offset={offset}
              $width={width}
            >
              {children}
            </Item>
          )}
        </SpaceYContext.Consumer>
      )}
    </SpaceXContext.Consumer>
  );

  const ColumnLayout: React.FC<ColumnsLayoutProps<Media, Space>> & {
    Column: typeof ColumnsLayoutColumn;
  } = ({spaceX, spaceY, alignX, alignY, children, ...otherProps}) => (
    <SpaceXContext.Provider value={spaceX}>
      <SpaceYContext.Provider value={spaceY}>
        <Wrapper {...otherProps} $spaceY={spaceY}>
          <Container
            $alignItems={mapAlignY(alignY)}
            $justifyContent={mapAlignX(alignX)}
            $spaceX={spaceX}
          >
            {children}
          </Container>
        </Wrapper>
      </SpaceYContext.Provider>
    </SpaceXContext.Provider>
  );

  ColumnLayout.Column = ColumnsLayoutColumn;

  return ColumnLayout;
};

export const ColumnLayout = createColumnLayout({
  map,
  getSpace,
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
});
