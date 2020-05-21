import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

export const createTextAlign = createFactoryForCSSPropertyMixin('text-align');
export const createTextDecoration = createFactoryForCSSPropertyMixin(
  'text-decoration',
);

export const createFontFamily = createFactoryForCSSPropertyMixin('font-family');
export const createFontSize = createFactoryForCSSPropertyMixin('font-size');
export const createFontStyle = createFactoryForCSSPropertyMixin('font-style');
export const createFontWeight = createFactoryForCSSPropertyMixin('font-weight');

export const createLineHeight = createFactoryForCSSPropertyMixin('line-height');
export const createLetterSpacing = createFactoryForCSSPropertyMixin(
  'letter-spacing',
);

export const textAlign = createTextAlign({map});
export const textDecoration = createTextDecoration({map});

export const fontFamily = createFontFamily({map});
export const fontSize = createFontSize({map});
export const fontStyle = createFontStyle({map});
export const fontWeight = createFontWeight({map});

export const letterSpacing = createLetterSpacing({map});
export const lineHeight = createLineHeight({map});
