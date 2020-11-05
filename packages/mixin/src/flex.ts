import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

export const createFlex = createFactoryForCSSPropertyMixin('flex');
export const createFlexBasis = createFactoryForCSSPropertyMixin('flex-basis');
export const createFlexDirection = createFactoryForCSSPropertyMixin(
  'flex-direction',
);
export const createFlexGrow = createFactoryForCSSPropertyMixin('flex-grow');
export const createFlexShrink = createFactoryForCSSPropertyMixin('flex-shrink');
export const createAlignItems = createFactoryForCSSPropertyMixin('align-items');
export const createJustifyContent = createFactoryForCSSPropertyMixin(
  'justify-content',
);

export const flex = createFlex({map});
export const flexBasis = createFlexBasis({map});
export const flexDirection = createFlexDirection({map});
export const flexGrow = createFlexBasis({map});
export const flexShrink = createFlexBasis({map});
export const alignItems = createAlignItems({map});
export const justifyContent = createJustifyContent({map});
