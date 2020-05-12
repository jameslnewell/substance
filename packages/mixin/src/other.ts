import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

export const createDisplay = createFactoryForCSSPropertyMixin('display');
export const createWidth = createFactoryForCSSPropertyMixin('width');
export const createMaxWidth = createFactoryForCSSPropertyMixin('maxWidth');
export const createMinWidth = createFactoryForCSSPropertyMixin('minWidth');
export const createHeight = createFactoryForCSSPropertyMixin('height');
export const createMaxHeight = createFactoryForCSSPropertyMixin('maxHeight');
export const createMinHeight = createFactoryForCSSPropertyMixin('minHeight');

export const display = createDisplay({map});
export const width = createWidth({map});
export const maxWidth = createMaxWidth({map});
export const minWidth = createMinWidth({map});
export const height = createHeight({map});
export const maxHeight = createMaxHeight({map});
export const minHeight = createMinHeight({map});

export const createOpacity = createFactoryForCSSPropertyMixin('opacity');

export const opacity = createOpacity({map});
