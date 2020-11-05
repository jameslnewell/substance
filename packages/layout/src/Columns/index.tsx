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
  alignItems,
  MixinFunction,
  MixinFunctionValue,
} from '@substance/mixin';
import styled, {css} from 'styled-components';
import {createSpaceStyles} from '../styles';
import {
  ResponsiveAlignX,
  ResponsiveAlignY,
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
  reverse?: ResponsiveValue<Media, boolean>;
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
  $halign?: ResponsiveAlignX<Media>;
  $reverse?: ResponsiveValue<Media, boolean>;
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
  paddingTop,
  paddingLeft,
}: CreateColumnLayoutOptions<Media, Space>): ColumnLayout<Media, Space> => {
  const SpaceXContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);
  const SpaceYContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);

  function halign({
    $halign,
    $reverse,
  }: {
    $halign?: ResponsiveAlignX<Media>;
    $reverse?: ResponsiveValue<Media, boolean>;
  }) {
    //if no value is specified, then don't output any css (it just makes it harder for the consumer to override)
    if (typeof $halign === 'undefined' && typeof $reverse === 'undefined') {
      return ``;
    }

    return map($halign, (value = 'left') => {
      let rule = '';
      switch (value) {
        case 'left':
          if ($reverse) {
            rule = 'flex-end';
          } else {
            rule = 'flex-start';
          }
          break;

        case 'right':
          if ($reverse) {
            rule = 'flex-start';
          } else {
            rule = 'flex-end';
          }
          break;

        case 'center':
          rule = 'center';
          break;

        default:
          throw new Error(
            `styled-components-grid: halign must be one of "left", "right", "center". Got "${String(
              value,
            )}"`,
          );
      }
      return css`
        justify-content: ${rule};
      `;
    });
  }

  function reverse(reverse: ResponsiveValue<Media, boolean>) {
    //if no value is specified, then don't output any css (it just makes it harder for the consumer to override)
    if (typeof reverse === 'undefined') {
      return css``;
    }

    return map(
      reverse,
      (value = false) =>
        `
          flex-direction: ${(value && 'row-reverse') || 'row'};
          flex-wrap: ${(value && 'wrap-reverse') || 'wrap'};
        `,
    );
  }

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
    ${halign}
    ${styles.container}
    ${createProps({
      $alignItems: alignItems,
      $reverse: reverse,
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
  } = ({spaceX, spaceY, alignX, alignY, reverse, children, ...otherProps}) => (
    <SpaceXContext.Provider value={spaceX}>
      <SpaceYContext.Provider value={spaceY}>
        <Wrapper {...otherProps} $spaceY={spaceY}>
          <Container
            $alignItems={mapAlignY(alignY)}
            $halign={alignX}
            $reverse={reverse}
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
  paddingTop,
  paddingLeft,
});
