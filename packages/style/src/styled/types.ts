/**
 * This file abstracts and adapts the CSS-in-JS framework
 * TODO: create a version of this file for emotion and generate a bundle for emotion
 */
import * as StyledComponents from 'styled-components';
export type Theme = StyledComponents.DefaultTheme;
export type ThemeProps = StyledComponents.ThemeProps<Theme>;
export type CSSFunction = StyledComponents.ThemedCssFunction<
  StyledComponents.DefaultTheme
>;
export type CSSObject = StyledComponents.CSSObject;
export type Interpolation<Props> =
  | StyledComponents.SimpleInterpolation
  | StyledComponents.Interpolation<Props>;
