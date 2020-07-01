import "styled-components";
// import {DefaultMedia} from '@substance/style';
import {DefaultSpace} from '@substance/mixin';

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      green: {
        light: string;
        dark: string;
      },
    },
    media: {
      [media in "sm" | "md" | "lg"]: string; 
    },
    space: {
      [space in DefaultSpace]: string;
    },
  }
}
