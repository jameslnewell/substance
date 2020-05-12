import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

export const createTextAlign = createFactoryForCSSPropertyMixin('textAlign');
export const createTextDecoration = createFactoryForCSSPropertyMixin(
  'textDecoration',
);

export const createFontFamily = createFactoryForCSSPropertyMixin('fontFamily');
export const createFontSize = createFactoryForCSSPropertyMixin('fontSize');
export const createFontStyle = createFactoryForCSSPropertyMixin('fontStyle');
export const createFontWeight = createFactoryForCSSPropertyMixin('fontWeight');

export const createLineHeight = createFactoryForCSSPropertyMixin('lineHeight');
export const createLetterSpacing = createFactoryForCSSPropertyMixin(
  'letterSpacing',
);

export const textAlign = createTextAlign({map});
export const textDecoration = createTextDecoration({map});

export const fontFamily = createFontFamily({map});
export const fontSize = createFontSize({map});
export const fontStyle = createFontStyle({map});
export const fontWeight = createFontWeight({map});

export const letterSpacing = createLetterSpacing({map});
export const lineHeight = createLineHeight({map});
