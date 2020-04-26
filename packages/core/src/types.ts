import {Properties, Pseudos} from 'csstype';
// import {CSSObject} from 'styled-components';

export interface ThemeProps<Theme> {
  theme?: Theme;
}

export type StyleProperty = keyof Properties<string | number>;
export type StyleValue = Properties<string | number>[StyleProperty];
export type StyleObject = Properties<string | number> & { [property in Pseudos]?: Properties<string | number> } & {[key: string]: CSSObject | string | number | undefined};
export type StyleFunction<Theme> = (props: ThemeProps<Theme>) => StyleObject;
export type Style<Theme> = StyleObject | StyleFunction<Theme>;


type CSSPseudos = { [K in Pseudos]?: CSSObject };
export interface CSSObject extends Properties<string | number>, CSSPseudos{
  [key: string]: CSSObject | string | number | undefined;
}
