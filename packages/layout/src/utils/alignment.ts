/* eslint-disable @typescript-eslint/camelcase */
import {
  ResponsiveValue,
  StyleValue,
  MediaConstraint,
  unstable_mapValueToValue,
} from '@substance/style';
import {MixinValue} from '@substance/mixin';

export type AlignX = 'left' | 'center' | 'right';
export type AlignY = 'top' | 'center' | 'bottom' | 'stretch';

export type ResponsiveAlignX<Media extends MediaConstraint> = ResponsiveValue<
  Media,
  AlignX
>;
export type ResponsiveAlignY<Media extends MediaConstraint> = ResponsiveValue<
  Media,
  AlignY
>;

export const defaultAlignX = 'initial';
export const defaultAlignY = 'initial';

const alignXValues: Record<AlignX, StyleValue<'justify-content'>> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const alignYValues: Record<AlignY, StyleValue<'justify-content'>> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

export function mapAlignX<Media extends MediaConstraint>(
  alignX: ResponsiveAlignX<Media> | undefined,
): MixinValue<Media, 'justify-content'> | undefined {
  return unstable_mapValueToValue(alignX, (align) => alignXValues[align]);
}

export function mapAlignY<Media extends MediaConstraint>(
  alignY: ResponsiveAlignY<Media> | undefined,
): MixinValue<Media, 'justify-content'> | undefined {
  return unstable_mapValueToValue(alignY, (align) => alignYValues[align]);
}
