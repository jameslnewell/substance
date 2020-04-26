import {DefaultTheme} from 'styled-components';
import {ThemeProps, StyleProperty, StyleValue, StyleObject, Style} from './types';

const createStylesFromTransformedValue = (properties: StyleProperty[], value: StyleValue) => {
  const style: Partial<StyleObject> = {};
  for (let property of properties) {
    style[property] = value as any;
  }
  return style;
}

export interface CreateStyleTransformFunction<Value extends any, Theme = DefaultTheme> {
  (value: Value): StyleValue | ((props: ThemeProps<Theme>) => StyleValue)
}

/**
 * Create a function for creating CSS declarations based on a list of CSS properties
 * @param properties The CSS property name
 * @param transform  The transformation function
 * 
 * @example
 *  createStyle(['margin-left', 'margin-right'], value => `${value}px`)(0);
 *  createStyle(['margin-left', 'margin-right'], value => ({theme}) => `${theme.space[value]}px`)(0);
 *  
 */
export const createStyle = <Value extends any, Theme = DefaultTheme>(properties: StyleProperty[], transform: CreateStyleTransformFunction<Value, Theme>) => {
  return (value: Value): Style<Theme> => {
    const transformedValue = transform(value);
    if (typeof transformedValue === 'function') {
      return (props) => createStylesFromTransformedValue(properties, transformedValue(props));
    } else {
      return createStylesFromTransformedValue(properties, transformedValue);
    }
  }
}
