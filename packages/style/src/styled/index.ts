/**
 * This file abstracts and adapts a specific CSS-in-JS framework
 * TODO: create a version of this file for emotion and generate a bundle for emotion
 */

// ========== TYPES ==========

import * as StyledComponents from 'styled-components';

export type Theme = StyledComponents.DefaultTheme;

export type CSSFunction = StyledComponents.ThemedCssFunction<
  StyledComponents.DefaultTheme
>;
export type CSSObject = StyledComponents.CSSObject;
export type Interpolation<Props> =
  | StyledComponents.SimpleInterpolation
  | StyledComponents.Interpolation<Props>;

// ========== FUNCTIONS ==========

export {default as styled, css} from 'styled-components';
