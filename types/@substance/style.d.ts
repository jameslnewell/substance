import '@substance/style';
import {Spaces, DefaultSpace} from '@substance/mixin';

export type Theme = {
  color: {
    green: {
      [name: string]: string;
    };
  };
  media: {
    sm: string;
    md: string;
    lg: string;
  };
  space: Spaces<DefaultSpace>;
};

declare module '@substance/style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module 'packages/style/src/types' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
